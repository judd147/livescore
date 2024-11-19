import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";
import { auth } from 'express-oauth2-jwt-bearer'

// this is a middleware that will validate the access token sent by the client
const requireAuth = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER,
  tokenSigningAlg: 'RS256'
});

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

app.get("/ping", (req, res) => {
  res.send("pong");
});

// Endpoints to implement:
// ✅ create a new match
// ✅ get all matches(last 7 days maybe) 🚧
// ✅ get team details
// ✅ verify user
// ✅ get user profile
// ✅ update user profile
// ✅ get favourite matches
// ✅ create/delete a favourite match

// Route for creating a match
app.post("/", async (req, res) => {
  const { id, date, league, status, homeScore, awayScore, homeTeam, awayTeam } = req.body;

  // Check if home team exists in the database, if not, create it
  let homeTeamRecord = await prisma.team.findUnique({
    where: { id: homeTeam.id },
  });

  if (!homeTeamRecord) {
    homeTeamRecord = await prisma.team.create({
      data: {
        id: homeTeam.id,
        name: homeTeam.name,
        logo: homeTeam.logo,
      },
    });
  }

  // Check if away team exists in the database, if not, create it
  let awayTeamRecord = await prisma.team.findUnique({
    where: { id: awayTeam.id },
  });

  if (!awayTeamRecord) {
    awayTeamRecord = await prisma.team.create({
      data: {
        id: awayTeam.id,
        name: awayTeam.name,
        logo: awayTeam.logo,
      },
    });
  }

  // Check if match exists in the database, if not, create it
  let matchRecord = await prisma.match.findUnique({
    where: { id },
  });

  if (!matchRecord) {
    // Create the match using the obtained or created team records
    const match = await prisma.match.create({
      data: {
        id,
        date,
        league,
        status,
        homeScore,
        awayScore,
        homeTeam: { connect: { id: homeTeamRecord.id } },
        awayTeam: { connect: { id: awayTeamRecord.id } },
      },
    });
    res.status(201).json(match);
  }
});

// Route for getting all matches
app.get("/", async (req, res) => {
  const matches = await prisma.match.findMany({
    include: { // query selected attributes from Team table
      homeTeam: {
        select: {
          id: true,
          name: true,
          logo: true
        },
      },
      awayTeam: {
        select: {
          id: true,
          name: true,
          logo: true
        },
      },
    },
  });
  res.json(matches);
});

// Route for getting team details
app.get("/teams/:id", async (req, res) => {
  const id = req.params.id;
  const team = await prisma.team.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      homeMatches: true,
      awayMatches: true
    }
  });
  if (team) {
    res.status(200).json(team);
  } else {
    res.status(404).end();
  }
});

// this endpoint is used by the client to verify the user status and to make sure the user is registered in our database once they signup with Auth0
// if not registered in our database we will create it.
// if the user is already registered we will return the user information
app.post("/verify-user", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const email = req.auth.payload[`${process.env.AUTH0_AUDIENCE}email`];
  const name = req.auth.payload[`${process.env.AUTH0_AUDIENCE}name`];

  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });

  if (user) {
    res.json(user);
  } else {
    const newUser = await prisma.user.create({
      data: {
        auth0Id,
        email,
        name
      },
    });
    res.json(newUser);
  }
});

// Route for getting user profile
app.get("/profile", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
  });
  res.json(user);
});

// Route for updating user profile
app.put("/profile", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const { name, email } = req.body;

  const updatedUser = await prisma.user.update({
    where: {
      auth0Id,
    },
    data: {
      name,
      email
    },
  });
  res.json(updatedUser);
});

// Route for updating a match
app.put("/matches/:id", async (req, res) => {
  const id = req.params.id;
  const { status, homeScore, awayScore } = req.body;

  const updatedMatch = await prisma.match.update({
    where: {
      id: parseInt(id)
    },
    data: {
      status,
      homeScore,
      awayScore
    }
  });
  res.json(updatedMatch);
})

// Route for getting favourite matches
app.get("/favourites", requireAuth, async (req, res) => {
  const auth0Id = req.auth.payload.sub;
  const user = await prisma.user.findUnique({
    where: {
      auth0Id,
    },
    include: {
      favourites: {
        include: {
          homeTeam: true,
          awayTeam: true,
        },
      },
    },
  });
  if (user?.favourites) {
    res.json(user.favourites);
  } else {
    res.json([]); // Return an empty array if favourites are null or undefined
  }
})

// Route for creating/deleting a favourite match
app.post("/favourites", requireAuth, async (req, res) => {
  try {
    const { matchId } = req.body;
    const auth0Id = req.auth.payload.sub;

    // Find the user
    const user = await prisma.user.findUnique({
      where: { auth0Id },
      include: { favourites: true }, // Include existing favourites
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isAlreadyFavorited = user.favourites.some((fav) => fav.id === matchId);

    // If the match is already favourited, remove it; otherwise, add it
    const updatedUser = isAlreadyFavorited
      ? await prisma.user.update({
          where: { auth0Id },
          data: {
            favourites: {
              disconnect: { id: matchId }, // Remove the match from favorites
            },
          },
          include: { favourites: true },
        })
      : await prisma.user.update({
          where: { auth0Id },
          data: {
            favourites: {
              connect: { id: matchId }, // Add the match to favorites
            },
          },
          include: { favourites: true },
        });

    res.status(201).json(updatedUser.favourites);
  } catch (error) {
    console.error('Error updating favorites:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = parseInt(process.env.PORT) || 8080
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🎉 🚀`);
});

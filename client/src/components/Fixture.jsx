import { useEffect } from 'react';
import { useMatchesContext } from '../MatchesContext';
import { useFavouritesContext } from '../FavouritesContext';
import { useFavouriteFunctions } from '../favouritesUtils';
import Match from './Match';

function Fixture() {
  const matchesFromDb = useMatchesContext();
  const { handleFavourite } = useFavouriteFunctions();
  const { favourites } = useFavouritesContext();

  // Sort matches by date
  const sortedMatches = matchesFromDb.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });

  // Process matches
  const transformMatches = (exampleResponse) => {
    const transformedMatches = exampleResponse.map((exampleMatch) => {
      const homeScore = exampleMatch.goals.home !== null ? exampleMatch.goals.home : 0;
      const awayScore = exampleMatch.goals.away !== null ? exampleMatch.goals.away : 0;
      return {
        id: exampleMatch.fixture.id,
        date: exampleMatch.fixture.date,
        league: exampleMatch.league.name,
        status: exampleMatch.fixture.status.short,
        homeScore,
        awayScore,
        homeTeam: {
          id: exampleMatch.teams.home.id,
          name: exampleMatch.teams.home.name,
          logo: exampleMatch.teams.home.logo,
        },
        awayTeam: {
          id: exampleMatch.teams.away.id,
          name: exampleMatch.teams.away.name,
          logo: exampleMatch.teams.away.logo,
        },
      };
    });
    return transformedMatches
  }

  // Fetch new data
  async function fetchNewData() {
    const lastFetchTimestamp = localStorage.getItem('lastFetchTimestamp');
    const currentTime = Date.now();

    // If no previous timestamp or if it's been more than 72 hours
    if (!lastFetchTimestamp || currentTime - parseInt(lastFetchTimestamp, 10) > 72 * 60 * 60 * 1000) {
      const targetLeagues = [
        {
          "name": "La Liga",
          "id": 140
        },
        {
          "name": "Premier League",
          "id": 39
        },
        {
          "name": "Bundesliga",
          "id": 78
        },
        {
          "name": "Serie A",
          "id": 135
        },
        {
          "name": "Ligue 1",
          "id": 61
        }
      ]
      targetLeagues.map(async (league) => {
        const data = await fetch(`https://v3.football.api-sports.io/fixtures?league=${league.id}&next=10&timezone=America/Vancouver`, {
        method: 'GET',
        headers: {
          "x-apisports-key": process.env.REACT_APP_FOOTBALL_KEY
        },
        });
        const jsonData = await data.json();
        const response = await jsonData.response;
        const transformedMatches = await transformMatches(response);
        await createNewMatchesInDb(transformedMatches);
      });
      // Store the current timestamp as the last fetch time
      localStorage.setItem('lastFetchTimestamp', currentTime.toString());
    } else {
        console.log('Data was fetched less than 72 hours ago. Skipping fetch.');
    }
  }

  async function createNewMatchesInDb(transformedMatches) {
    transformedMatches.forEach(async (match) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(match),
        });
        const data = await response.json();
        console.log('Match created:', data);
      } catch (error) {
        console.error('Error creating match:', error);
      }
    });
  }

  async function updateData() {
    const currentTime = Date.now();
    let targetMatches = matchesFromDb.filter((match) => match.status !== "FT" && Date.parse(match.date) < currentTime);
    if (targetMatches.length > 20) {
      targetMatches = targetMatches.slice(0, 20); // API allows max of 20 games per request
    }
    const matchIds = targetMatches.map((match) => match.id).join('-');
    if (matchIds) {
      const data = await fetch(`https://v3.football.api-sports.io/fixtures?ids=${matchIds}&timezone=America/Vancouver`, {
        method: 'GET',
        headers: {
          "x-apisports-key": process.env.REACT_APP_FOOTBALL_KEY
        },
      });
      const jsonData = await data.json();
      const response = await jsonData.response;
      const transformedMatches = await transformMatches(response);
      await updateMatchesInDb(transformedMatches);
    } else {
      console.log("All matches are up to date.");
    }
  }

  async function updateMatchesInDb(transformedMatches) {
    transformedMatches.forEach(async (match) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/matches/${match.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(match),
        });
        const data = await response.json();
        console.log('Match updated:', data);
      } catch (error) {
        console.error('Error updating match:', error);
      }
    });
  }

  useEffect(() => {
    fetchNewData();
    // Update match data every 10 minutes
    const interval = setInterval(() => {
      updateData();
    }, 10 * 60 * 1000);
      // Clean up the interval on component unmount
      return () => clearInterval(interval);
  });

  return (
    <div className="match-list">
      {sortedMatches.map((match) => (
        <Match
        key={match.id}
        matchData={match}
        isFavourited={favourites.includes(match.id)}
        handleFavourite={handleFavourite}
      />
      ))}
    </div>
  );
}

export default Fixture;
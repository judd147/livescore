import React, { useEffect, useState } from 'react';
import { useMatchesContext } from '../MatchesContext';
import { useFavouritesContext } from '../FavouritesContext';
import { useFavouriteFunctions } from '../favouritesUtils';
import { useNavigate, useParams } from 'react-router-dom';
import Match from './Match';

function Team() {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const { handleFavourite } = useFavouriteFunctions();
  const matchesFromDb = useMatchesContext();
  const { favourites } = useFavouritesContext();
  const [teamDetails, setTeamDetails] = useState({});

  const teamMatches = matchesFromDb.filter((match) => match.homeTeam.id === parseInt(teamId) || match.awayTeam.id === parseInt(teamId));

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/teams/${teamId}`);
        if (response.ok) {
          const data = await response.json();
          setTeamDetails(data);
        }
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
    };
    fetchTeamDetails();
  }, [teamId]);

  if (!teamDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-8 bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigate('/app')}
              className="flex items-center text-blue-500 font-semibold hover:text-blue-600 focus:outline-none text-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Home
            </button>
            <div className="flex items-center">
              <img src={teamDetails.logo} alt={teamDetails.name} className="h-24 w-24 mr-4" />
              <h2 className="text-xl font-semibold">{teamDetails.name}</h2>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {teamMatches.map((match) => (
              <Match
                key={match.id}
                matchData={match}
                isFavourited={favourites.includes(match.id)}
                handleFavourite={handleFavourite}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
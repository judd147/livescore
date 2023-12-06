import { Link } from "react-router-dom";
import { BellIcon } from '@heroicons/react/outline';
import { BellIcon as SolidBellIcon } from '@heroicons/react/solid';

function Match({ matchData, isFavourited, handleFavourite }) {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  // Function to determine score text style based on match status
  const getScoreTextStyle = () => {
    const { status, homeScore, awayScore } = matchData;

    if (status === 'FT') {
      if (homeScore > awayScore) {
        return {
          homeStyle: 'font-bold text-gray-800',
          awayStyle: 'text-gray-500',
        };
      } else if (homeScore < awayScore) {
        return {
          homeStyle: 'text-gray-500',
          awayStyle: 'font-bold text-gray-800',
        };
      } else {
        // Draw
        return {
          homeStyle: 'text-gray-500',
          awayStyle: 'text-gray-500',
        };
      }
    } else if (status === 'HT' || status === '1H' || status === '2H') {
      // Match in progress
      return {
        homeStyle: 'text-red-500',
        awayStyle: 'text-red-500',
      };
    } else {
      // Not started or other status
      return {
        homeStyle: '',
        awayStyle: '',
      };
    }
  };

  const scoreTextStyles = getScoreTextStyle();

  return (
    <div className="grid grid-cols-5 gap-x-1 py-4 border-b border-gray-200 match-row">
      {/* Date and Status */}
      <div className="col-span-1 flex flex-col justify-between">
        <span className="text-gray-600">{formatDate(matchData.date)}</span>
        <span className="text-gray-500">{matchData.status}</span>
      </div>

      {/* Home Logo and Away Logo */}
      <div className="col-span-1 flex flex-col items-center gap-y-1">
        <img src={matchData.homeTeam.logo} alt={matchData.homeTeam.name} className="h-6 w-6" />
        <img src={matchData.awayTeam.logo} alt={matchData.awayTeam.name} className="h-6 w-6" />
      </div>

      {/* Home Name and Away Name */}
      <div className="col-span-1 flex flex-col gap-y-1">
        {/* Navigate to team details with team ID */}
        <Link to={`/teams/${matchData.homeTeam.id}`} className="text-gray-800 cursor-pointer hover:text-blue-500">
          {matchData.homeTeam.name}
        </Link>
        <Link to={`/teams/${matchData.awayTeam.id}`} className="text-gray-800 cursor-pointer hover:text-blue-500">
          {matchData.awayTeam.name}
        </Link>
      </div>

      {/* Home Score and Away Score */}
      {matchData.status === 'NS' ? (
        // Match not started, do not show scores
        <div className="col-span-1 flex flex-col gap-y-0.5 items-center justify-center">
          <span>-</span>
          <span>-</span>
        </div>
      ) : (
        // Display scores based on status rules
        <div className="col-span-1 flex flex-col gap-y-0.5 items-center justify-center">
          <span className={scoreTextStyles.homeStyle}>{matchData.homeScore}</span>
          <span className={scoreTextStyles.awayStyle}>{matchData.awayScore}</span>
        </div>
      )}

      {/* Bell Icon */}
      <div className="col-span-1 flex items-center justify-center">
        <div className="favourite-icon" onClick={() => handleFavourite(matchData.id)}>
          {isFavourited ? (
            <SolidBellIcon className="h-6 w-6 text-blue-500 cursor-pointer hover:text-blue-700" />
          ) : (
            <BellIcon className="h-6 w-6 text-blue-500 cursor-pointer hover:text-blue-700" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Match;
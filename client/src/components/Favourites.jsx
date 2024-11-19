import { useMatchesContext } from '../MatchesContext';
import { useFavouritesContext } from '../FavouritesContext';
import { useFavouriteFunctions } from '../favouritesUtils';
import Match from './Match';

function Favourites() {
  const matchesFromDb = useMatchesContext();
  const { handleFavourite } = useFavouriteFunctions();
  const { favourites } = useFavouritesContext();
  const favouriteMatches = matchesFromDb.filter((match) => favourites.includes(match.id));

  // Sort matches by date
  const sortedMatches = favouriteMatches.slice().sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });
  
  return (
    <div className="match-list">
      {favourites.length === 0 ? (
        <p className="text-black">No Favourites Yet</p>
      ) : (sortedMatches
        .map((match) => (
          <Match
            key={match.id}
            matchData={match}
            isFavourited={favourites.includes(match.id)}
            handleFavourite={handleFavourite}
          />
        )))}
    </div>
  );
}

export default Favourites;

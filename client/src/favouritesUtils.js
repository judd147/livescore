import { useAuthToken } from "./AuthTokenContext";
import { useFavouritesContext } from './FavouritesContext';

export const useFavouriteFunctions = () => {
  const { accessToken } = useAuthToken();
  const { favourites, setFavourites } = useFavouritesContext();

  // Update favourite to the database
  const updateFavourites = async (matchId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/favourites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ matchId }),
      });

      if (response.ok) {
        await response.json();
      } else {
        throw new Error('Failed to update favorite');
      }
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const handleFavourite = async (matchId) => {
    const isFavourited = favourites.includes(matchId);
    let updatedFavourites;

    if (isFavourited) {
      // Remove from favourites
      updatedFavourites = favourites.filter((id) => id !== matchId);
    } else {
      // Add to favourites
      updatedFavourites = [...favourites, matchId];
    }
    // Update state optimistically
    setFavourites(updatedFavourites);
    // Update to the database
    await updateFavourites(matchId);
  };

  return { handleFavourite };
};

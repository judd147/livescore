import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthToken } from "./AuthTokenContext";

const FavouritesContext = createContext([]);

export const useFavouritesContext = () => useContext(FavouritesContext);

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const { accessToken } = useAuthToken();

  // fetch favourites from db
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/favourites`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });    
        if (response.ok) {
          const data = await response.json();
          setFavourites(data.map((fav) => fav.id)); // Store only match IDs as favourites
        } else {
          throw new Error('Failed to fetch favourites');
        }
      } catch (error) {
        console.error('Error fetching favourites:', error);
      }
    };
    if (accessToken) {
      fetchFavourites();
    }
  }, [accessToken]);

  return (
    <FavouritesContext.Provider value={{ favourites, setFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContext;
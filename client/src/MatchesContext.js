import React, { createContext, useContext, useState, useEffect } from 'react';

const MatchesContext = createContext([]);

export const useMatchesContext = () => useContext(MatchesContext);

export const MatchesProvider = ({ children }) => {
  const [matches, setMatches] = useState([]);

  const fetchMatchesFromBackend = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}`);
      if (response.ok) {
        const data = await response.json();
        setMatches(data); // Update state with fetched matches
      } else {
        throw new Error('Failed to fetch match data');
      }
    } catch (error) {
      console.error('Error fetching match data:', error);
    }
  };

  useEffect(() => {
    fetchMatchesFromBackend(); // Fetch matches from the backend API
  }, []);

  return (
    <MatchesContext.Provider value={matches}>
      {children}
    </MatchesContext.Provider>
  );
};

export default MatchesContext;
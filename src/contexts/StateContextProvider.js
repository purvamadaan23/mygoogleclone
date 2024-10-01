import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create a new context
const StateContext = createContext();
const baseUrl = 'https://www.googleapis.com/customsearch/v1'; // Google Custom Search API endpoint

const apiKey = 'AIzaSyDitDWddvo1eYWKyRI3bHW82iCdW54vbAo'; // Replace with your API key
const searchEngineId = 'a7e72df33bf10419f';
export const StateContextProvider = ({ children }) => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to fetch search results
  const getResults = async (query, type = '') => {
    setLoading(true);

    const params = {
      q: query,
      key: apiKey,
      cx: searchEngineId,
    };

    // Add specific params for image, video, and news searches
    if (type === 'image') {
      params.searchType = 'image'; // Image search
    } else if (type === 'news') {
      params.siteSearch = 'news.google.com'; // News search
    } else if (type === 'video') {
      params.q += ' video'; // Video search refinement
    }

    try {
      const res = await axios.get(baseUrl, { params });
      console.log('API Response:', res.data); // Log the API response
      setResults(res.data); // Set the fetched results to the state
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StateContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, loading }}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook to use the state context
export const useStateContext = () => useContext(StateContext);

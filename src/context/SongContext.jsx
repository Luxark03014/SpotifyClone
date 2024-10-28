// SongsContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const SongsContext = createContext();

export const useSongs = () => useContext(SongsContext);

export const SongsProvider = ({ children }) => {
  const [topTracks, setTopTracks] = useState([]);
  const token = 'undefined'; // Reemplaza este valor

  async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method,
      body: JSON.stringify(body),
    });
    return await res.json();
  }

  async function getTopTracks() {
    return (await fetchWebApi(
      'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
    )).items;
  }

  useEffect(() => {
    async function fetchData() {
      const tracks = await getTopTracks();
      setTopTracks(tracks);
    }
    fetchData();
  }, []);

  return (
    <SongsContext.Provider value={{ topTracks }}>
      {children}
    </SongsContext.Provider>
  );
};

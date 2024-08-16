import api from "./api"
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants';
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data once when the app loads
    const fetchUser = async () => {
      try{
        const a_token = localStorage.getItem(ACCESS_TOKEN);
        const a_decoded = jwtDecode(a_token);
        const u = await api.get(`user/${a_decoded.user_id}`)

        setUser(u.data)
      } catch (e) {
          console.log('Error fetching user data:', e)
      }
    };

    if (localStorage.getItem(ACCESS_TOKEN)&&localStorage.getItem(REFRESH_TOKEN)){
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
const RoleContext = createContext();

export function RoleProvider({ children }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function fetchUserRole() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/customer_role`, {
          withCredentials: true, // Ensure cookies are included
        });
        setRole(response.data.role); // Assuming `data.role` is provided by the API response
      } catch (error) {
        console.error('Failed to fetch user role:', error);
      }
    }

    fetchUserRole();
  }, []);

  return <RoleContext.Provider value={role}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    isAuthenticated && (
      <div className="flex flex-row justify-evenly">
        <img src={user.picture} alt={user.name} className='h-20 w-20' />
        <h2>{user.name}</h2>
        <p>Email: {user.email}</p>
      </div>
    )
  );
};
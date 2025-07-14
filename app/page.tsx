/* eslint-disable @next/next/no-img-element */
"use client";

import { useUser } from "@auth0/nextjs-auth0";

export default function Home() {
  const { user, isLoading } = useUser();
  return (
    <div className="flex flex-col items-center justify-center">
      <h1> Home</h1>
      {!user ? (
        <a href="/auth/login">Login</a>
      ) : (
        <a href="/auth/logout">logout</a>
      )}{" "}
      <a href="/protected">Protected</a>
      <>
        {isLoading && <p>Loading...</p>}
        {user && (
          <div style={{ textAlign: "center" }}>
            <img
              src={user.picture}
              alt="Profile"
              style={{ borderRadius: "50%", width: "80px", height: "80px" }}
            />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
        )}
      </>
    </div>
  );
}

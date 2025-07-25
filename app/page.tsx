"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { useState } from "react";
import { apiService } from "services/api";

export default function Home() {
  const { user, isLoading } = useUser();
  const [preference, setPreference] = useState<string | null>(null);

  async function fetchPreferences() {
    console.log("🔍 Calling fetchPreferences");
    try {
      const data = await apiService.getPreference();
      console.log("✅ Got data:", data);
      setPreference(JSON.stringify(data));
    } catch (err) {
      console.error("Failed to load preferences:", err);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1> Home</h1>
      <button onClick={fetchPreferences}>get preferences</button>
      {!user ? (
        <a href="/auth/login">Login</a>
      ) : (
        <a href="/auth/logout">logout</a>
      )}{" "}
      <a href="/protected">Protected</a>
      <>
        {isLoading && <p>Loading...</p>}
        {/* {user && (
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
        )} */}

        {preference && <pre>{preference}</pre>}
      </>
    </div>
  );
}

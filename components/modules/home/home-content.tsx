import { HomeContentClient } from "@/components/modules/home/home-content-client";
import { PreferencesForm } from "@/components/modules/PreferenceForm";
import { serverFetch } from "services/api/server-fetch";
import {
  IBadgeList,
  IHealth,
  IMotivation,
  IPreference,
} from "services/api/types";

export async function HomeContent() {
  let motivation: IMotivation | null = null;
  let badgesData: IBadgeList | null = null;
  let health: IHealth | null = null;
  let preferences: IPreference | null = null;

  try {
    motivation = await serverFetch<IMotivation>("/motivation/detailed-text");
    badgesData = await serverFetch<IBadgeList>("/badges/me");
    health = await serverFetch<IHealth>("/health");
    preferences = await serverFetch<IPreference>("/preference");
  } catch (e) {
    console.error(e);
  }

  if (!motivation || !badgesData || !health || !preferences) {
    return <PreferencesForm />;
  }

  return (
    <HomeContentClient
      initialPreferences={preferences}
      health={health}
      motivation={motivation}
    />
  );
}

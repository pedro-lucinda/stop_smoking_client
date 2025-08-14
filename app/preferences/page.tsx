/* eslint-disable @typescript-eslint/no-explicit-any */

import { PreferencesForm } from "@/components/modules/PreferenceForm";
import { Spinner } from "@/components/ui/kibo-ui/spinner";
import { serverFetch } from "services/api/server-fetch";
import { IPreference } from "services/api/types";

export default async function PreferencesPage() {
  const preference = await serverFetch<IPreference>("/preference");

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Edit preferences</h1>
      {!!preference ? (
        <PreferencesForm pref={preference} />
      ) : (
        <Spinner variant="ring" />
      )}
    </div>
  );
}

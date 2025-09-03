import { PreferencesForm } from "@/components/modules/PreferenceForm";
import { Spinner } from "@/components/ui/kibo-ui/spinner";
import { serverFetch } from "services/api/server-fetch";
import { IPreference } from "services/api/types";

export default async function PreferencesPage() {
  const preference = await serverFetch<IPreference>("/preference");

  return (
    <div className="w-full my-5 flex flex-col p-4  overflow-auto ">
      <h1 className="text-xl font-bold mb-4 text-center">Edit preferences</h1>
      {!!preference ? (
        <PreferencesForm pref={preference} />
      ) : (
        <Spinner variant="ring" />
      )}
    </div>
  );
}

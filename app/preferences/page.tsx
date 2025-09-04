import { PreferencesForm } from "@/components/modules/PreferenceForm";
import { Spinner } from "@/components/ui/kibo-ui/spinner";
import { serverFetch } from "services/api/server-fetch";
import { IPreference } from "services/api/types";

export default async function PreferencesPage() {
  const preference = await serverFetch<IPreference>("/preference");

  return (
    <div className="w-full flex flex-col   overflow-auto ">
      {!!preference ? (
        <PreferencesForm pref={preference} />
      ) : (
        <Spinner variant="ring" />
      )}
    </div>
  );
}

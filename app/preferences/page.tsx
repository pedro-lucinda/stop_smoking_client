import { PreferencesForm } from "@/components/modules/PreferenceForm";
import { Spinner } from "@/components/ui/kibo-ui/spinner";
import { cookies } from "next/headers";
import { apiService } from "services/api";
import { IPreference } from "services/api/types";

export default async function PreferencesPage() {
  let preference: IPreference | null = null;

  const cookiesData = await cookies();
  const cookieHeader = cookiesData.toString();

  try {
    preference = await apiService.getPreference({
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    });
  } catch (err: any) {
    console.error("Failed to fetch daily motivation:", err);
  }

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

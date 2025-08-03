/* eslint-disable @typescript-eslint/no-explicit-any */
import { PreferencesForm } from "@/components/modules/PreferenceForm";
import { cookies } from "next/headers";
import { apiService } from "services/api";
import { IPreference } from "services/api/types";

export default async function userPage() {
  let pref: IPreference | null = null;
  const cookiesData = await cookies();
  const cookiesHeader = cookiesData.toString();
  try {
    pref = await apiService.getPreference({
      headers: {
        Cookie: cookiesHeader,
      },
    });
    console.log("Fetched preference:", pref);
  } catch (err: any) {
    pref = null;
    console.error("Error fetching preference:", err);
  }

  console.log("Preference data:", pref);
  return (
    <>
      {pref ? (
        <PreferencesForm pref={pref} />
      ) : (
        <div>
          <h1>Protected Page</h1>
          <p>This page is protected and requires authentication.</p>
        </div>
      )}
    </>
  );
}

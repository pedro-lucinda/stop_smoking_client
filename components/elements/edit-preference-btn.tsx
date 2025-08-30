import { Settings2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function EditPreferenceBtn() {
  return (
    <Link href="/preferences" className="">
      <Button variant="outline" size="sm">
        <Settings2 className="h-4 w-4 mr-2" />
        Edit preferences
      </Button>
    </Link>
  );
}

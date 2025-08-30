import Link from "next/link";

export function LoginButton() {
  return (
    <Link
      href="/auth/login?returnTo=/"
      className="p-2 flex items-center gap-2 rounded-sm bg-blue-100 w-[80px] font-bold justify-center text-blue-900"
    >
      Login
    </Link>
  );
}
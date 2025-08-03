import { UserButton } from "../../elements/user-button";

export function Navbar() {
  return (
    <nav className="flex p-2 justify-between items-center bg-gray-100">
      <div className="flex p-2 justify-between items-center  container mx-auto">
        <h3 className="font-bold text-md">Stop Smok buddy</h3>
        <UserButton />
      </div>
    </nav>
  );
}

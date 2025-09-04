import { ReactElement } from "react";

interface Props {
  title: string;
  icon: ReactElement;
  onClick: () => void;
  isSelected?: boolean;
}

export function NavbarItem({ title, icon, onClick, isSelected }: Props) {
  return (
    <div
      onClick={onClick}
      className={`flex  gap-2 p-2 rounded-md cursor-pointer transition-colors  items-center hover:bg-blue-900 ${
        isSelected ? "border-b-3 border-blue-800" : ""
      } `}
    >
      {icon}
      <p className="font-bold text-sm text-white">{title}</p>
    </div>
  );
}

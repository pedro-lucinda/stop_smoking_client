import { ReactElement } from "react";

interface Props {
  title: string;
  icon: ReactElement;
  onClick: () => void;
  isSelected?: boolean;
  showText: boolean;
}

export function SidebarItem({
  title,
  icon,
  onClick,
  showText,
  isSelected,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer items-center gap-2 p-2 w-full cursor-pointer rounded-md transition-colors hover:bg-accent ${
        isSelected ? "bg-accent" : ""
      } ${showText ? "" : "items-center justify-center"}`}
    >
      {icon}
      {showText && <p className="font-bold text-sm">{title}</p>}
    </div>
  );
}

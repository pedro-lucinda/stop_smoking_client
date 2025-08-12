import { SidebarNavItem } from "@/components/modules/Sidebar";
import { Angry, Book, MessageCircle, User } from "lucide-react";

export const SIDEBAR_MENU_ITEMS: SidebarNavItem[] = [
  {
    id: 1,
    title: "Home",
    route: "/user",
    icon: <User />,
  },
  {
    id: 2,
    title: "Cravings",
    route: "/cravings",
    icon: <Angry />,
  },
  {
    id: 3,
    title: "Diary",
    route: "/diary",
    icon: <Book />,
  },
  {
    id: 4,
    title: "Chat",
    route: "/chat",
    icon: <MessageCircle />,
  },
];

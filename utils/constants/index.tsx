import { SidebarNavItem } from "@/components/modules/Sidebar";
import { Angry, Book, MessageCircle, User } from "lucide-react";

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
export const THREAD_EP = `${API_BASE}/chat/thread`;
export const STREAM_EP = (threadId: string) =>
  `${API_BASE}/chat/threads/${threadId}/stream`;

export const TOOL_LABEL: Record<string, string> = {
  tavily_search: "Search",
};

export const SIDEBAR_MENU_ITEMS: SidebarNavItem[] = [
  {
    id: 1,
    title: "Home",
    route: "/",
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

export const LANGUAGE_OPTIONS = [
  { value: "en-us", label: "English" },
  { value: "pt-BR", label: "Português (Brasil)" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
];

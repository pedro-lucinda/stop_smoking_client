import { INavbarNavItem } from "@/components/modules/Navbar";
import { Angry, Book, MessageCircle, User } from "lucide-react";

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
export const THREAD_EP = `${API_BASE}/chat/thread`;
export const STREAM_EP = (threadId: string) =>
  `${API_BASE}/chat/threads/${threadId}/stream`;

export const TOOL_LABEL: Record<string, string> = {
  tavily_search: "Search",
};

export const SIDEBAR_MENU_ITEMS: INavbarNavItem[] = [
  {
    id: 1,
    title: "Home",
    route: "/",
    icon: <User className="text-white w-4 h-4" />,
  },
  {
    id: 2,
    title: "Cravings",
    route: "/cravings",
    icon: <Angry className="text-white w-4 h-4" />,
  },
  {
    id: 3,
    title: "Diary",
    route: "/diary",
    icon: <Book className="text-white w-4 h-4" />,
  },
  {
    id: 4,
    title: "Chat",
    route: "/chat",
    icon: <MessageCircle className="text-white w-4 h-4" />,
  },
];

export const LANGUAGE_OPTIONS = [
  { value: "en-us", label: "English" },
  { value: "pt-BR", label: "Português (Brasil)" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
];

// Craving form options
export const FEELING_OPTIONS = [
  { value: "none", label: "None" },
  { value: "anxious", label: "Anxious" },
  { value: "stressed", label: "Stressed" },
  { value: "bored", label: "Bored" },
  { value: "sad", label: "Sad" },
  { value: "angry", label: "Angry" },
  { value: "happy", label: "Happy" },
  { value: "relaxed", label: "Relaxed" },
  { value: "tired", label: "Tired" },
  { value: "energetic", label: "Energetic" },
  { value: "frustrated", label: "Frustrated" },
  { value: "lonely", label: "Lonely" },
  { value: "excited", label: "Excited" },
  { value: "calm", label: "Calm" },
  { value: "overwhelmed", label: "Overwhelmed" },
];

export const ACTIVITY_OPTIONS = [
  { value: "none", label: "None" },
  { value: "working", label: "Working" },
  { value: "driving", label: "Driving" },
  { value: "eating", label: "Eating" },
  { value: "drinking", label: "Drinking" },
  { value: "socializing", label: "Socializing" },
  { value: "watching-tv", label: "Watching TV" },
  { value: "reading", label: "Reading" },
  { value: "exercising", label: "Exercising" },
  { value: "cooking", label: "Cooking" },
  { value: "cleaning", label: "Cleaning" },
  { value: "shopping", label: "Shopping" },
  { value: "studying", label: "Studying" },
  { value: "gaming", label: "Gaming" },
  { value: "walking", label: "Walking" },
  { value: "resting", label: "Resting" },
  { value: "commuting", label: "Commuting" },
  { value: "meeting", label: "Meeting" },
  { value: "other", label: "Other" },
];

export const COMPANY_OPTIONS = [
  { value: "none", label: "None" },
  { value: "alone", label: "Alone" },
  { value: "family", label: "Family" },
  { value: "friends", label: "Friends" },
  { value: "colleagues", label: "Colleagues" },
  { value: "partner", label: "Partner" },
  { value: "children", label: "Children" },
  { value: "parents", label: "Parents" },
  { value: "siblings", label: "Siblings" },
  { value: "strangers", label: "Strangers" },
  { value: "acquaintances", label: "Acquaintances" },
  { value: "neighbors", label: "Neighbors" },
  { value: "classmates", label: "Classmates" },
  { value: "roommates", label: "Roommates" },
  { value: "other", label: "Other" },
];

export interface IGoal {
  id?: number;
  description: string;
  is_completed: boolean;
}

export interface IPreference {
  id: number;
  reason: string;
  quit_date: string;
  language: string;
  goals: IGoal[];
}

export interface IUser {
  id: number;
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  language: string;
}

export interface IMotivation {
  id: number;
  user_id: number;
  date: string;
  progress: string;
  motivation: string;
  cravings: string;
  ideas: string;
  recommendations: string;
}

export interface IMotivation {
  id: number;
  user_id: number;
  date: string; // YYYY-MM-DD
  progress: string;
  motivation: string;
  cravings: string;
  ideas: string;
  recommendations: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface IDiary {
  id: number;
  date: string; // YYYY-MM-DD
  notes?: string;
  have_smoked?: boolean;
  craving_range?: number;
  number_of_cravings?: number;
  number_of_cigarets_smoked?: number;
}

export interface IDiaryList {
  diaries: IDiary[];
  total: number;
}

export type DiaryCreate = {
  date: string;
  notes?: string;
  have_smoked?: boolean;
  craving_range?: number;
  number_of_cravings?: number;
  number_of_cigarets_smoked?: number;
};

export type DiaryUpdate = Partial<DiaryCreate>;

export interface ICraving {
  id: number;
  date: string; // YYYY-MM-DD
  comments: string;
  have_smoked: boolean;
  desire_range: number | null;
  number_of_cigarets_smoked: number | null;
  feeling: string | null;
  activity: string | null;
  company: string | null;
  created_at?: string;
  updated_at?: string;
}

export type CravingCreate = {
  date: string;
  comments: string;
  have_smoked: boolean;
  desire_range?: number | null;
  number_of_cigarets_smoked?: number | null;
  feeling?: string | null;
  activity?: string | null;
  company?: string | null;
};

export type ICravingList = { cravings: ICraving[]; total: number };

export interface IBadge {
  id: number;
  name: string;
  description: string | null;
  icon?: string | null;
  created_at?: string;
  updated_at?: string;
}

export type IBadgeList = { badges: IBadge[]; total: number };

export interface IHealth {
  date: string; // ISO date
  pulse_rate: number;
  oxygen_levels: number;
  carbon_monoxide_level: number;
  nicotine_expelled: number;
  taste_and_smell: number;
  breathing: number;
  energy_levels: number;
  circulation: number;
  gum_texture: number;
  immunity_and_lung_function: number;
  reduced_risk_of_heart_disease: number;
  decreased_risk_of_lung_cancer: number;
  decreased_risk_of_heart_attack: number;
  life_regained_in_hours: number;
}

/* ===== Chat API types ===== */

export interface ThreadOut {
  thread_id: string;
}

export type ChatEvent =
  | TokenEvent
  | ToolCallEvent
  | ToolResultEvent
  | ToolErrorEvent;

export interface TokenEvent {
  event: "token";
  text: string;
}

export interface ToolCallEvent {
  event: "tool_call";
  id: string;
  tool: string;
  args: unknown;
}

export interface ToolResultEvent {
  event: "tool_result";
  id: string;
  tool: string;
  content: unknown;
}

export interface ToolErrorEvent {
  event: "tool_error";
  id: string;
  tool?: string;
  error: string;
}

export type ToolState =
  | "input-streaming"
  | "input-available"
  | "output-available"
  | "output-error";

export interface AssistantTool {
  id: string;
  name: string;
  state: ToolState;
  input?: unknown;
  output?: unknown;
  errorText?: string;
}

type Role = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  tools?: AssistantTool[];
}

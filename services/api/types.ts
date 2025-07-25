export interface IGoal {
  id: number;
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

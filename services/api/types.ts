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

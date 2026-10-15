export type CardProps = {
  label: string;
  value: string;
  goal: string;
  color: string;
};

export interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  createdAt: Date;
}

export type GridProps = {
  meals?: Meal[] | null;
};

export type MealItemProps = Partial<Meal> & {
  id: string;
  name: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  createdAt: Date;
  reloadMeals: () => void;
};

export type ShareButtonProp = {
  meals: Meal[];
};

// Duplicate CopyButtonProp's properties from ShareButtonProp
export type CopyButtonProp = ShareButtonProp;

import { Meal } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

const MEALS_KEY = "meals";

export const addMeal = async (
  meal: Omit<Meal, "id" | "createdAt">,
): Promise<Meal> => {
  // 1. Get all the meals from AsyncStorage
  const meals: Meal[] = (await getMeals()) || [];

  // 2. create the new meal
  const newMeal: Meal = {
    ...meal,
    id: Crypto.randomUUID(), // Outputs UUIDv4, e.g. "e305e714-c116-444a-b5e1-87236526eefb"
    createdAt: new Date(),
  };

  // 3. Save the new meal to AsyncStorage
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify([newMeal, ...meals]));

  // 4. return the meal after saving
  return newMeal;
};

export const getMeals = async (): Promise<Meal[]> => {
  const data = await AsyncStorage.getItem(MEALS_KEY);
  return data ? JSON.parse(data) : [];
};

export const deleteMeal = async (id: string): Promise<void> => {
  const meals = getMeals();
  const filtered = (await meals).filter((meal) => meal.id !== id);
  await AsyncStorage.setItem(MEALS_KEY, JSON.stringify(filtered));
};

export const clearMeals = async (): Promise<void> => {
  await AsyncStorage.removeItem(MEALS_KEY);
};

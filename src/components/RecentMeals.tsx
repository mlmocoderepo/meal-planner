import { globalStyles } from "@/styles/global";
import { Meal } from "@/types";
import { Text, View } from "react-native";
import MealItem from "./MealItem";

export default function RecentMeals({
  meals = [],
  reloadMeals,
}: {
  meals: Meal[];
  reloadMeals: () => void;
}) {
  return (
    <View style={{ marginTop: 10 }}>
      <Text style={globalStyles.sectionTitle}>Recent Meals</Text>
      {meals.length === 0 ? (
        <Text style={globalStyles.empty}>No meals logged yet.</Text>
      ) : (
        meals
          ?.slice(0, 3)
          .map((meal) => (
            <MealItem
              key={meal.id}
              id={meal.id}
              name={meal.name}
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
              reloadMeals={reloadMeals}
              createdAt={meal.createdAt}
            />
          ))
      )}
    </View>
  );
}

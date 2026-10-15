import MealItem from "@/components/MealItem";
import { colors, globalStyles } from "@/styles/global";
import { Meal } from "@/types";
import { clearMeals, getMeals } from "@/utils/storage";
import * as Haptics from "expo-haptics";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Meals() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  const handleClearAll = () => {
    Alert.alert("Delete All", "Delete all meals?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await clearMeals();
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          loadMeals();
        },
      },
    ]);
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Meals</Text>
        {meals.length !== 0 && (
          <TouchableOpacity onPress={handleClearAll}>
            <Text style={styles.clearButton}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.list}>
        {meals.length === 0 ? (
          <Text style={globalStyles.empty}>No meals logged yet.</Text>
        ) : (
          meals.map((meal) => (
            <MealItem
              id={meal.id}
              key={meal.id}
              name={meal.name}
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
              createdAt={meal.createdAt}
              reloadMeals={loadMeals}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
    paddingBottom: 40,
  },
  clearButton: {
    color: colors.alert,
    fontSize: 16,
    fontWeight: "400",
  },
});

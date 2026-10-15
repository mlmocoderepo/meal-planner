import { MealItemProps } from "@/types";
import { deleteMeal } from "@/utils/storage";
import * as Haptics from "expo-haptics";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function MealItem({
  id,
  name,
  calories,
  protein,
  carbs,
  fat,
  createdAt,
  reloadMeals,
}: MealItemProps) {
  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const timeFormatOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const handleLongPress = () => {
    Alert.alert("Delete Meal", `Are you sure you want to delete ${name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deleteMeal(id);
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          reloadMeals();
        },
      },
    ]);
  };
  return (
    <TouchableOpacity style={styles.container} onLongPress={handleLongPress}>
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.itemStats}>
          {calories ?? 0} cal •{protein ?? 0}g P •{carbs ?? 0}g C •{fat ?? 0}g F
        </Text>
        <Text style={styles.dateStats}>
          {new Date(createdAt).toLocaleString("en-GB", dateFormatOptions) ?? ""}
          {", "}
          {new Date(createdAt).toLocaleString("en-US", timeFormatOptions) ?? ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#16213e",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
  },
  itemStats: {
    flexDirection: "row",
    fontWeight: "600",
    fontSize: 14,
    color: "#a0a0b0",
    marginTop: 4,
  },
  dateStats: {
    flexDirection: "row",
    fontWeight: "400",
    fontSize: 13,
    color: "#a0a0b0",
    marginTop: 12,
  },
});

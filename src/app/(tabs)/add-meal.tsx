import { colors, globalStyles } from "@/styles/global";
import { addMeal } from "@/utils/storage";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddMeal() {
  const [name, setName] = useState<string>("");
  const [calories, setCalories] = useState<string>("");
  const [protein, setProtein] = useState<string>("");
  const [carbs, setCarbs] = useState<string>("");
  const [fat, setFat] = useState<string>("");

  const handleAddMeal = async () => {
    try {
      if (!name || !calories)
        throw new Error("Meal name and calories cannot be empty.");

      await addMeal({
        name,
        calories: Number(calories),
        protein: Number(protein) || 0,
        carbs: Number(carbs) || 0,
        fat: Number(fat) || 0,
      });

      setName("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setFat("");

      // * Provide success notification and return to main page
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert("Success", "Meal added successfully.");
      router.push("/");
    } catch (error) {
      Alert.alert(
        "Opps...",
        error instanceof Error ? error.message : "An error has occured.",
      );
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Add Meal</Text>
      {/* Meal name */}
      <TextInput
        style={styles.input}
        placeholder="Meal Name"
        placeholderTextColor={colors.textSecondary}
        value={name}
        onChangeText={setName}
      />
      {/* Calories */}
      <TextInput
        style={styles.input}
        placeholder="Calories"
        placeholderTextColor={colors.textSecondary}
        value={calories}
        onChangeText={setCalories}
      />
      <View style={styles.row}>
        {/* protein */}
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="Protein (g)"
          placeholderTextColor={colors.textSecondary}
          value={protein}
          onChangeText={setProtein}
        />
        {/* carbs */}
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="Carbs (g)"
          placeholderTextColor={colors.textSecondary}
          value={carbs}
          onChangeText={setCarbs}
        />
        {/* fat */}
        <TextInput
          style={[styles.input, styles.rowInput]}
          placeholder="Fat (g)"
          placeholderTextColor={colors.textSecondary}
          value={fat}
          onChangeText={setFat}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleAddMeal}>
        <Text style={styles.buttonText}>Add Meal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 16,
    borderRadius: 10,
    fontSize: 13,
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  rowInput: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "condensedBold",
  },
});

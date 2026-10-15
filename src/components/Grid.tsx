import { colors } from "@/styles/global";
import { GridProps } from "@/types";
import { StyleSheet, View } from "react-native";
import Card from "./Card";

// Inline param example
// export default function Grid({ meals = [] }: {meals?:Meal[] | null})

export default function Grid({ meals = [] }: GridProps) {
  const total = meals?.reduce(
    (accumulator, currentValue) => ({
      calories: accumulator.calories + currentValue.calories,
      protein: accumulator.protein + currentValue.protein,
      carbs: accumulator.carbs + currentValue.carbs,
      fat: accumulator.fat + currentValue.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );

  if (!meals)
    return (
      <View style={styles.grid}>
        <Card
          label="Calories"
          value="0"
          goal={"2000"} // TODO - to set dynamically
          color={colors.textCalories}
        />
        <Card
          label="Protein"
          value="0"
          goal={"150g"} // TODO - to set dynamically
          color={colors.textProtein}
        />
        <Card
          label="Carbs"
          value="0"
          goal={"250g"} // TODO - to set dynamically
          color={colors.textCarbs}
        />
        <Card
          label="Fat"
          value="0"
          goal={"250g"} // TODO - to set dynamically
          color={colors.textFat}
        />
      </View>
    );

  return (
    <View style={styles.grid}>
      <Card
        label="Calories"
        value={`${total?.calories}`}
        goal={"2000"} // TODO - to set dynamically
        color="#ff6b6b"
      />
      <Card
        label="Protein"
        value={`${total?.protein}`}
        goal={"150g"} // TODO - to set dynamically
        color="#4ecdc4"
      />
      <Card
        label="Carbs"
        value={`${total?.carbs}`}
        goal={"250g"} // TODO - to set dynamically
        color="#ffd93d"
      />
      <Card
        label="Fat"
        value={`${total?.fat}`}
        goal={"250g"} // TODO - to set dynamically
        color="#6bcb77"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});

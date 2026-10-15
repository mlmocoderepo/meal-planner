import { colors } from "@/styles/global";
import { ShareButtonProp } from "@/types";
import AntDesign from "@react-native-vector-icons/ant-design";
import { Share, StyleSheet, TouchableOpacity } from "react-native";

export default function ShareButton({ meals = [] }: ShareButtonProp) {
  const handleShare = async () => {
    // consoldiate the total
    const total = meals.reduce(
      (accumulator, currentValue) => ({
        calories: accumulator.calories + currentValue.carbs,
        protein: accumulator.protein + currentValue.protein,
        carbs: accumulator.carbs + currentValue.carbs,
        fat: accumulator.fat + currentValue.fat,
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    );

    await Share.share({
      message: `Meal Planner Daily Summary:\n\n
        • Calories: ${total.calories}\n
        • Protein: ${total.protein}\n 
        • Carbs: ${total.carbs}\n
        • Fat: ${total.fat}\n
        Total meals logged: ${meals.length}`,
    });
  };

  return (
    <TouchableOpacity onPress={handleShare}>
      <AntDesign
        style={styles.shareBtn}
        name="share-alt"
        size={24}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shareBtn: {
    fontSize: 24,
    marginTop: 4,
    marginBottom: 30,
    marginRight: 10,
  },
});

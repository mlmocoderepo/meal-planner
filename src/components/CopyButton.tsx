import { colors } from "@/styles/global";
import { CopyButtonProp } from "@/types";
import AntDesign from "@react-native-vector-icons/ant-design";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function copyBtn({ meals = [] }: CopyButtonProp) {
  const handleCopy = async () => {
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

    const summary = `Meal Planner Daily Summary:\n\n
        • Calories: ${total.calories}\n
        • Protein: ${total.protein}\n 
        • Carbs: ${total.carbs}\n
        • Fat: ${total.fat}\n
        Total meals logged: ${meals.length}`;

    await Clipboard.setStringAsync(summary);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Copied", "Meal Planner summary copied to clipboard.");
  };

  return (
    <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
      <Text style={styles.copyBtnTxt}>Copy Summary</Text>
      <AntDesign name="copy" size={18} color={colors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  copyBtn: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    marginTop: 16,
    marginBottom: 16,
  },
  copyBtnTxt: {
    fontSize: 14,
    color: colors.primary,
  },
});

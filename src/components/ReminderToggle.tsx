import { colors } from "@/styles/global";
import {
  cancelMealReminder,
  requestPermission,
  scheduleMealReminder,
} from "@/utils/notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

const REMINDER_KEY = "mealReminderEndabled";

export default function ReminderToggle() {
  const [enabled, setEnabled] = useState<boolean>(false);

  const load = async () => {
    const val = await AsyncStorage.getItem(REMINDER_KEY);
    setEnabled(val === "true");
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = async (value: boolean) => {
    // 1. If switch is turned on (value === true)
    if (value) {
      // 2. Request for Permission to add notifications
      const granted = await requestPermission();
      // 3. If permission not granted, end function
      if (!granted) return;
      // 4. Otherwise, call scheduleReminder()
      await scheduleMealReminder();
    } else {
      // 5. If switch is turned off (value === false)
      await cancelMealReminder();
    }
    // 6. Set the switch
    setEnabled(value);
    // 7. Store the state of the REMINDER_KEY in AsyncStorage
    await AsyncStorage.setItem(REMINDER_KEY, value.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.txtNotificationLabel}>
        Meal Reminder is {enabled ? "ON" : "OFF"}
      </Text>
      <Switch
        value={enabled}
        onValueChange={toggle}
        trackColor={{ false: colors.surface, true: colors.primary }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  txtNotificationLabel: {
    color: colors.primary,
    fontSize: 14,
    paddingRight: 10,
  },
});

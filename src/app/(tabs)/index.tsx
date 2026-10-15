import CopyButton from "@/components/CopyButton";
import Grid from "@/components/Grid";
import HomeHeader from "@/components/HomeHeader";
import RecentMeals from "@/components/RecentMeals";
import ReminderToggle from "@/components/ReminderToggle";
import ShareButton from "@/components/ShareButton";
import { globalStyles } from "@/styles/global";
import { Meal } from "@/types";
import { getMeals } from "@/utils/storage";
import * as Device from "expo-device";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
export default function Index() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
  };

  // !! Runs every time the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  return (
    <ScrollView
      contentContainerStyle={
        {
          // !! Re-intro to spread content vertically on screen
          // flexGrow: 1,
          // justifyContent: "space-around",
        }
      }
      style={globalStyles.container}
    >
      <Text style={globalStyles.title}>Meal Planner</Text>
      <View style={globalStyles.header}>
        <HomeHeader />
        <ShareButton meals={meals} />
      </View>
      <Grid meals={meals} />
      <ReminderToggle />
      <RecentMeals meals={meals} reloadMeals={loadMeals} />
      <CopyButton meals={meals} />
      <View style={styles.captionContainer}>
        <Text style={styles.caption}>
          This app is running on {Device.brand}, {Platform.OS}.
        </Text>
        <Text style={styles.caption}> Version: {Device.osVersion}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  captionContainer: {
    marginTop: 16,
    alignItems: "center",
    flexDirection: "column",
  },
  caption: {
    fontSize: 12,
    fontWeight: "condensedBold",
    color: "#ffffff",
  },
});

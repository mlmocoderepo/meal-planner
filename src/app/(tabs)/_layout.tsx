import { colors } from "@/styles/global";
import { AntDesign } from "@react-native-vector-icons/ant-design";
import { Tabs } from "expo-router";

function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderColor: colors.surface,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color}></AntDesign>
          ),
        }}
      />
      <Tabs.Screen
        name="add-meal"
        options={{
          title: "Add Meal",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plus" size={size} color={color}></AntDesign>
          ),
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: "Meals",
          tabBarIcon: ({ color, size }) => (
            <AntDesign
              name="unordered-list"
              size={size}
              color={color}
            ></AntDesign>
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout;

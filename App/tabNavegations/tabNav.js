import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "../screens/Home/ScreenHome";
import SettingsStackScreen from "../screens/Home/ScreenUnidades";
import { NavigationContainer } from "@react-navigation/native";

const tabNav = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="HomeMenu" component={HomeStackScreen} />
        <Tab.Screen name="SettingsMenu" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default tabNav;
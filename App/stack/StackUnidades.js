import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen1 from "../screens/Home/ScreenHome";
import SettingsScreen2 from "../screens/Home/ScreenUnidades";

const StackUnidades = () => {
  const SettingsStack = createNativeStackNavigator();
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="Settings1" component={SettingsScreen1} />
      <SettingsStack.Screen name="Settings2" component={SettingsScreen2} />
    </SettingsStack.Navigator>
  );
};

export default StackUnidades;
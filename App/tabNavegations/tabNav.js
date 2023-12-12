import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackScreen from "../screens/Home/ScreenHome";
import { NavigationContainer } from "@react-navigation/native";

const tabNav = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="HomeMenu" component={HomeStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default tabNav;
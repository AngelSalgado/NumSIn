import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  useNavigation,
  useRoute,
  StackActions,
} from "@react-navigation/native";
import { Icon} from "@rneui/themed";
import ScreenHome from "../screens/Home/ScreenHome";

const Stack = createStackNavigator();

export default function StackHome() {
  const route = useRoute();
  const { username, password } = route.params;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
        name="Home"
        component={ScreenHome}
        initialParams={{ username, password }}
      />

    </Stack.Navigator>
  );
}

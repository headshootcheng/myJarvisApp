import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "./constants/color";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const headerSetting = {
    headerStyle: {
      backgroundColor: colors.green["500"],
    },
    headerTintColor: colors.white,
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            title: "Detail",
            ...headerSetting,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            ...headerSetting,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

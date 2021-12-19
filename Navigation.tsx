import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import colors from "./constants/color";
import Home from "./pages/Home";
import Notification from "./pages/Notification";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HamburgerIcon, Button } from "native-base";

const Navigation = () => {
  const Drawer = createDrawerNavigator();

  const headerSetting = (props: any) => ({
    headerStyle: {
      backgroundColor: colors.green["500"],
    },
    headerTintColor: colors.white,
    headerTitleStyle: {
      fontWeight: "bold",
    },
    headerLeft: () => (
      <Button
        style={{ backgroundColor: "transparent" }}
        onPress={() => {
          props.navigation.openDrawer();
        }}
      >
        <HamburgerIcon style={{ color: "white", marginLeft: 10, height: 22 }} />
      </Button>
    ),
  });
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={Home}
          options={(props) => ({
            title: "Home",
            ...headerSetting(props),
          })}
        />
        <Drawer.Screen
          name="Notification"
          component={Notification}
          options={(props) => ({
            title: "Notification",
            ...headerSetting(props),
          })}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

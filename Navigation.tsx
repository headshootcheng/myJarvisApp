import React, { useEffect } from "react";
import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { Image } from "react-native";
import colors from "./constants/color";
import Home from "./pages/Home";
import Notification from "./pages/Notification";
import { useFonts } from "@expo-google-fonts/inter";
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { HamburgerIcon, Button } from "native-base";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScanQRCode from "./pages/ScanQRCode";
import QRCode from "./pages/QRCode";
import ScanResultPage from "./pages/ScanResultPage";

const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();

const drawerHeaderSetting = (props: {
  route: RouteProp<ParamListBase, string>;
  navigation: any;
}) => ({
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

const DrawScreens = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const fetchDataFromAsyncStorage = async () => {
      try {
        const value = await AsyncStorage.getItem("qrcodeData");
        if (value) navigation.navigate("ScanQRCodeResult" as never);
      } catch (err) {}
    };
    fetchDataFromAsyncStorage();
  }, []);
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={(props) =>
          ({
            title: "Home",
            ...drawerHeaderSetting(props),
          } as DrawerNavigationOptions)
        }
      />
      <Drawer.Screen
        name="Notification"
        component={Notification}
        options={(props) =>
          ({
            title: "Notification",
            ...drawerHeaderSetting(props),
          } as DrawerNavigationOptions)
        }
      />
      <Drawer.Screen
        name="QRCode"
        component={QRCode}
        options={(props) =>
          ({
            title: "QRCode",
            ...drawerHeaderSetting(props),
          } as DrawerNavigationOptions)
        }
      />
    </Drawer.Navigator>
  );
};

const Navigation = () => {
  const [fontsLoaded] = useFonts({
    "Rubik-Regular": require("./assets/fonts/Rubik-Regular.ttf"),
  });

  return (
    <NavigationContainer>
      <HomeStack.Navigator initialRouteName="Drawer">
        <HomeStack.Screen
          name="Drawer"
          component={DrawScreens}
          options={() =>
            ({
              headerShown: false,
            } as NativeStackNavigationOptions)
          }
        />
        <HomeStack.Screen
          name="ScanQrCode"
          component={ScanQRCode}
          options={(props) =>
            ({
              title: "掃描二維碼",
              headerStyle: {
                backgroundColor: "#13b188",
              },
              headerTintColor: colors.white,
              headerTitleStyle: {
                fontWeight: "bold",
                fontFamily: fontsLoaded ? "Rubik-Regular" : "",
                textShadowColor: "rgba(0, 0, 0, 0.5)",
                color: "white",
                textShadowOffset: { width: 0, height: 2 },
                textShadowRadius: 4,
                fontSize: 18,
              },
              headerLeft: () => (
                <Button
                  style={{
                    backgroundColor: "transparent",
                  }}
                  onPress={() => {
                    props.navigation.goBack();
                  }}
                >
                  <Image
                    style={{
                      tintColor: "white",
                      height: 25,
                      width: 25,
                      bottom: 5,
                      right: 20,
                    }}
                    source={require("./assets/images/qrcode/headerBack.png")}
                  />
                </Button>
              ),
            } as NativeStackNavigationOptions)
          }
        />
        <HomeStack.Screen
          name={"ScanQRCodeResult"}
          component={ScanResultPage}
          options={() =>
            ({
              headerShown: false,
            } as NativeStackNavigationOptions)
          }
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

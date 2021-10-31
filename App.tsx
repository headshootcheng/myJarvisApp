import { StatusBar } from "expo-status-bar";
import React from "react";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { NativeBaseProvider } from "native-base";
import Navigation from "./Navigation";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { Text, View, Button, Platform } from "react-native";

const queryClient = new QueryClient();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default function App() {
  const [expoPushToken, setExpoPushToken] = React.useState<any>("");
  const [notification, setNotification] = React.useState<any>(false);
  const notificationListener = React.useRef<any>();
  const responseListener = React.useRef<any>();

  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "hi",
        body: "yo",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("response:::::", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <NativeBaseProvider>
            <Navigation />
            <StatusBar />
          </NativeBaseProvider>
        </RecoilRoot>
      </QueryClientProvider>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>
            Title: {notification && notification.request.content.title}{" "}
          </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>
            Data:{" "}
            {notification && JSON.stringify(notification.request.content.data)}
          </Text>
        </View>
        <Button
          title="Press to schedule a notification"
          onPress={async () => {
            await schedulePushNotification();
          }}
        />
      </View>
    </>
  );
}

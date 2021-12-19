import React from "react";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Text, View, Platform } from "react-native";
import { Subscription } from "expo-modules-core";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
// locally
// async function schedulePushNotification(content: string, person: string) {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Well Saying",
//       body: `${content} --- ${person}`,
//       sound: "bellSound.wav",
//     },
//     // after 2 seconds and then trigger
//     trigger: { seconds: 2 },
//   });
// }
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
    // generate the token which represent for your app and device
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

const Notification = () => {
  const [expoPushToken, setExpoPushToken] = React.useState<string>("");
  const notificationListener = React.useRef<Subscription>();
  const responseListener = React.useRef<Subscription>();

  // turn on notification
  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      if (token) setExpoPushToken(token);
    });
    // listen to the notification message
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log(notification);
        //setNotification(notification);
      });
    // listen to the event that user tap the notification
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("response:::::", response);
      });

    return () => {
      if (notificationListener?.current && responseListener?.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
    </View>
  );
};

export default Notification;

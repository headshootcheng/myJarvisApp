import React from "react";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Text, View, Button, Platform } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import useWellSayingMutation from "../hooks/useWellSayingMutation";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

async function schedulePushNotification(content: string, person: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Well Saying",
      body: `${content} --- ${person}`,
      sound: "bellSound.wav",
    },
    // after 2 seconds and then trigger
    trigger: { seconds: 2 },
  });
}

const BACKGROUND_FETCH_TASK = "background-fetch";

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
  const [expoPushToken, setExpoPushToken] = React.useState<any>("");
  const [notification, setNotification] = React.useState<any>(false);
  const notificationListener = React.useRef<any>();
  const responseListener = React.useRef<any>();

  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    const { data } = await wellSayingMutateAsync();
    schedulePushNotification(data.newslist[0].content, data.newslist[0].mrname);
    return BackgroundFetch.BackgroundFetchResult.NewData;
  });

  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 1, // 15 minutes
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }
  const { mutateAsync: wellSayingMutateAsync } = useWellSayingMutation();

  // turn on notification and background task locally
  React.useEffect(() => {
    const startBackgroundTask = async () => {
      await registerBackgroundFetchAsync();
    };
    startBackgroundTask();

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
          await schedulePushNotification("test", "Peter");
        }}
      />
    </View>
  );
};

export default Notification;

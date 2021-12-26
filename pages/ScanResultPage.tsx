/* eslint-disable react/no-unescaped-entities */
import { Button, Center, HStack, Stack, VStack } from "native-base";
import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useFonts } from "@expo-google-fonts/inter";
import { useNavigation } from "@react-navigation/native";

const ScanResultPage = () => {
  const [fontsLoaded] = useFonts({
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
  });
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Button
        style={styles.closeBtn}
        onPress={() => {
          navigation.navigate("QRCode" as never);
        }}
      >
        <Image
          source={require("../assets/images/qrcode/headerClose.png")}
          style={styles.closeIcon}
        />
      </Button>
      <View>
        <Center style={{ marginTop: 50 }}>
          <Image
            source={require("../assets/images/qrcode/qrcodeLogo.png")}
            style={styles.headerIcon}
          />
        </Center>
        <VStack alignItems={"center"} space={5} mt={10}>
          <Text
            style={[
              styles.smallText,
              fontsLoaded && { fontFamily: "Rubik-Regular" },
            ]}
          >
            你已進入場所
          </Text>
          <Text
            style={[
              styles.placeText,
              fontsLoaded && {
                fontFamily: "Rubik-Regular",
              },
            ]}
          >
            Test
          </Text>
          <Text
            style={[
              styles.dateText,
              fontsLoaded && { fontFamily: "Rubik-Regular" },
            ]}
          >
            2021-12-25 01:14
          </Text>
        </VStack>
        <Center>
          <Image
            source={require("../assets/images/qrcode/resultCircleTick.png")}
            style={styles.circleImg}
          />
        </Center>
      </View>
      <View>
        <VStack alignItems={"center"} space={5} mb={5}>
          <Button
            style={styles.leaveBtn}
            onPress={() => {
              navigation.navigate("QRCode" as never);
            }}
          >
            <Text
              style={[
                styles.leaveBtnText,
                fontsLoaded && { fontFamily: "Rubik-Regular" },
              ]}
            >
              離開場所
            </Text>
          </Button>
          <Text
            style={[
              styles.smallText,
              fontsLoaded && { fontFamily: "Rubik-Regular" },
            ]}
          >
            當你離開時請緊記按"離開"
          </Text>
        </VStack>

        <Stack
          style={styles.bottomRow}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <HStack alignItems={"center"} space={2}>
            <View style={styles.checkboxContainer}>
              <Image
                source={require("../assets/images/qrcode/tick.png")}
                style={styles.checkboxImg}
              />
            </View>
            <Text
              style={[
                styles.checkboxText,
                fontsLoaded && { fontFamily: "Rubik-Regular" },
              ]}
            >
              4小時後自動離開
            </Text>
          </HStack>
          <Text
            style={[
              styles.changeBtn,
              fontsLoaded && { fontFamily: "Rubik-Regular" },
            ]}
          >
            變更
          </Text>
        </Stack>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#13b188",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  closeBtn: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 0,
    top: 45,
    zIndex: 1,
  },
  headerIcon: {
    height: 120,
    width: 120,
  },
  closeIcon: {
    tintColor: "white",
  },
  smallText: {
    fontSize: 18,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  placeText: {
    fontSize: 35,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    color: "rgb(255, 218, 49)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  dateText: {
    fontSize: 30,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  circleImg: {
    marginTop: 50,
    height: 100,
    width: 100,
    tintColor: "white",
  },
  checkboxContainer: {
    height: 35,
    width: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 5,
  },
  checkboxImg: {
    height: 25,
    width: 25,
    tintColor: "white",
  },
  checkboxText: {
    fontSize: 18,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  bottomRow: {
    marginBottom: 50,
    paddingHorizontal: 30,
  },
  changeBtn: {
    color: "yellow",
    textDecorationLine: "underline",
    fontSize: 18,
  },
  leaveBtn: {
    backgroundColor: "rgb(255, 218, 49)",
    shadowOpacity: 0.8,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    borderRadius: 50,
    height: 70,
    width: 220,
  },
  leaveBtnText: {
    fontSize: 22,
  },
});

export default ScanResultPage;

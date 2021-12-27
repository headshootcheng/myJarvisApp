import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";
import { useNavigation } from "@react-navigation/native";
import { Base64 } from "js-base64";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";

export default function ScanQRCode() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const navigation = useNavigation();
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    const regex = "^.*(eyJt.*)$";
    const decodedPlace = Base64.decode(data.match(regex)?.[1] ?? "").replace(
      "eyJt",
      ""
    );
    try {
      await AsyncStorage.setItem(
        "qrcodeData",
        JSON.stringify({
          place: JSON.parse(decodedPlace),
          date: dayjs().format("YYYY-MM-DD hh:mm"),
        } as never)
      );
      navigation.navigate(
        "ScanQRCodeResult" as never
        // {
        //   place: JSON.parse(decodedPlace),
        //   date: dayjs().format("YYYY-MM-DD hh:mm"),
        // } as never
      );
    } catch (error) {
      alert(`async Storage Failed: ${error}`);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.camera]}
      >
        <Image
          source={require("../assets/images/qrcode/qrCodeBorder.png")}
          style={styles.border}
        />
        <BarcodeMask
          showAnimatedLine={false}
          width={290}
          height={290}
          edgeColor="transparent"
        />
        <Text
          style={{
            position: "relative",
            top: 50,
            color: "white",
            fontSize: 18,
          }}
        >
          掃描二維碼
        </Text>
      </BarCodeScanner>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    position: "relative",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(1,1,1,0.6)",
  },
  border: {
    marginTop: 20,
    height: 300,
    width: 300,
    backgroundColor: "transparent",
    zIndex: 1,
  },
});

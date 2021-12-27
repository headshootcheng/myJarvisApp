import { useNavigation } from "@react-navigation/native";
import { Button, Center } from "native-base";
import React from "react";

const QRCode = () => {
  const navigation = useNavigation();
  return (
    <Center flex={1}>
      <Button
        colorScheme="blue"
        size={"lg"}
        onPress={() => {
          navigation.navigate("ScanQrCode" as never);
        }}
      >
        Scan QR Code
      </Button>
    </Center>
  );
};

export default QRCode;

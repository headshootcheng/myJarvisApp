import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, useTheme } from "native-base";
import colors from "../constants/color";
interface Props {}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.green["700"],
  },
});

const Home: React.FC<Props> = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  return (
    <View>
      <Text>Home</Text>
      <Button
        style={styles.btn}
        onPress={() => {
          navigation.navigate("Detail", { test: 1 });
        }}
      >
        Test
      </Button>
    </View>
  );
};

export default Home;

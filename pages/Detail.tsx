import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

const Detail = () => {
  const route = useRoute();
  console.log(route);
  return (
    <View>
      <Text>Detail</Text>
    </View>
  );
};

export default Detail;

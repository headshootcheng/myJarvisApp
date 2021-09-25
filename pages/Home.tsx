import React from "react";
import { StyleSheet, View, Text, TextInput, Platform } from "react-native";
import { FormControl, Button } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import color from "../constants/color";
interface Props {}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  form: {
    marginTop: 20,
  },
  wrapper: {
    padding: 20,
  },
  form_label: {
    marginTop: 20,
  },
  form_input: {
    borderColor: color.black,
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    padding: 10,
    fontSize: 15,
    width: "100%",
  },
  submitBtn: {
    marginTop: 20,
  },
});

const maxDate = () => {
  const newDate = new Date();
  newDate.setDate(newDate.getDate() + 7);
  return newDate;
};
const Home: React.FC<Props> = () => {
  const [event, setEvent] = React.useState<string>("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const submitForm = () => {
    console.log(event, date);
  };
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Set Up Whatsapp Reminder</Text>
      <FormControl style={styles.form} isRequired isInvalid>
        <FormControl.Label style={styles["form_label"]}>
          Event
        </FormControl.Label>
        <TextInput
          style={styles.form_input}
          value={event}
          placeholder="Enter your event"
          onChangeText={(text: string) => setEvent(text)}
        />
        <FormControl.ErrorMessage>
          Please enter your event name
        </FormControl.ErrorMessage>
        <FormControl.Label style={styles["form_label"]}>Date</FormControl.Label>
        <DateTimePicker
          mode={`${Platform.OS === "ios" ? "datetime" : "date"}`}
          minimumDate={new Date()}
          onChange={(e: any, newDate: Date) => {
            setDate(newDate);
          }}
          maximumDate={maxDate()}
          value={date ?? new Date()}
        />
      </FormControl>
      <Button style={styles.submitBtn} onPress={submitForm}>
        Submit
      </Button>
    </View>
  );
};

export default Home;

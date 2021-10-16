import React from "react";
import { StyleSheet, View, Text, TextInput, Platform } from "react-native";
import { FormControl, Button } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import color from "../constants/color";
import dayjs from "dayjs";
import axios from "axios";
import useDataMutation from "../hooks/useDataMutation";
import LoadingModal from "../component/LoadingModal";
import AlertModal from "../component/Alert";

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
const Home = () => {
  const [event, setEvent] = React.useState<string>("");
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [alert, setAlert] = React.useState<Alert | null>(null);
  const [isAlertOpen, setIsAlertOpen] = React.useState<boolean>(false);
  const postForm = () => {
    return axios.post("http://localhost:5000/telegramMsg", {
      alertDate: dayjs(date).format("YYYY-MM-DDTHH:mm"),
      alertText: event,
    });
  };
  const { dataMutation } = useDataMutation({ postMethod: postForm });
  const submitForm = async () => {
    try {
      const { data: successMsg } = await dataMutation.mutateAsync();
      setIsAlertOpen(true);
      setAlert({
        message: successMsg as string,
        status: "success",
      });
    } catch (error: any) {
      setIsAlertOpen(true);
      setAlert({
        message: error?.response?.data ?? ("Internal Error" as string),
        status: "error",
      });
    }
  };
  return (
    <>
      <LoadingModal />
      <View style={styles.wrapper}>
        <AlertModal
          isOpened={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          status={alert?.status ?? "info"}
          message={alert?.message ?? ""}
        />
        <Text style={styles.title}>Set Up Telegram Reminder</Text>
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
          <FormControl.Label style={styles["form_label"]}>
            Date
          </FormControl.Label>
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
        <Button
          style={styles.submitBtn}
          onPress={submitForm}
          disabled={event.trim() === ""}
        >
          Submit
        </Button>
      </View>
    </>
  );
};

export default Home;

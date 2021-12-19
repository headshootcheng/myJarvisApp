import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import { loading } from "../stateMgmt/loading";
import { MY_BACKEND_URL } from "@env";
import dayjs from "dayjs";
import axios from "axios";

const useTelegramMutation = () => {
  const setLoading = useSetRecoilState(loading);

  return useMutation(
    ({ date, event }: { date: Date; event: string }) =>
      axios.post(`${MY_BACKEND_URL}/telegramMsg`, {
        alertDate: dayjs(date).format("YYYY-MM-DDTHH:mm"),
        alertText: event,
      }),
    {
      onMutate: () => {
        setLoading(true);
      },
      onSettled: () => {
        setLoading(false);
      },
    }
  );
};

export default useTelegramMutation;

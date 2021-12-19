import { useMutation, UseMutationResult } from "react-query";
import axios, { AxiosResponse } from "axios";

const useWellSayingMutation = (): UseMutationResult<
  AxiosResponse<any, any>,
  any,
  void,
  any
> => {
  return useMutation(() =>
    axios.get(
      `http://api.tianapi.com/dictum/index?key=f739e58d252bca4b59709f899dcdc114&num=1`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
  );
};

export default useWellSayingMutation;

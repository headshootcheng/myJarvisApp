import { AxiosResponse } from "axios";
import React from "react";
import { useMutation } from "react-query";
import { useSetRecoilState } from "recoil";
import { loading } from "../stateMgmt/loading";
interface Props {
  postMethod: () => Promise<AxiosResponse<unknown, any>>;
}

const useDataMutation = ({ postMethod }: Props) => {
  const dataMutation = useMutation(postMethod);
  const setLoading = useSetRecoilState(loading);
  React.useEffect(() => {
    if (dataMutation.isLoading) setLoading(true);
    else setLoading(false);
  }, [dataMutation.isLoading]);

  return {
    dataMutation,
  };
};

export default useDataMutation;

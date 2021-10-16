import React from "react";
import { Modal, Spinner, Stack } from "native-base";
import { useRecoilValue } from "recoil";
import { loading } from "../stateMgmt/loading";

const LoadingModal = () => {
  const isLoading = useRecoilValue(loading);
  return (
    <Modal isOpen={isLoading}>
      <Stack direction="column" alignItems="center" justifyContent="center">
        <Spinner size="lg" color="emerald.500" />
      </Stack>
    </Modal>
  );
};

export default LoadingModal;

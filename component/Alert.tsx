import {
  VStack,
  Alert,
  HStack,
  CloseIcon,
  IconButton,
  Text,
} from "native-base";
import React from "react";

interface Props extends Alert {
  isOpened: boolean;
  onClose: () => void;
}
const AlertModal = ({
  status = "info",
  message = "",
  isOpened,
  onClose,
}: Props) => {
  React.useEffect(() => {
    if (isOpened) setTimeout(onClose, 4000);
  }, [isOpened]);
  if (!isOpened) return null;
  return (
    <Alert w="100%" status={status}>
      <VStack space={2} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          space={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack flexShrink={1} space={5} alignItems="center">
            <Alert.Icon />
            <Text fontSize="md" fontWeight="medium" color="coolGray.800">
              {message}
            </Text>
          </HStack>
          <IconButton
            variant="unstyled"
            icon={<CloseIcon size="3" color="coolGray.600" />}
            onPress={onClose}
          />
        </HStack>
      </VStack>
    </Alert>
  );
};

export default AlertModal;

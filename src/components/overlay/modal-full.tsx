import { Text, View } from "react-native";
import { Modal } from "react-native-paper";
import { ModalFullProps } from "../../types";

const ModalFull = ({
  title,
  isOpen,
  onClose,
  children,
}: ModalFullProps) => {
  const containerStyle = {
    backgroundColor: "white", 
    width: '100%',
    height: '100%', 
    alignSelf: "center",
  } as any;

  return (
    <Modal
      visible={isOpen}
      onDismiss={onClose}
      contentContainerStyle={containerStyle}
    >
      <View className="w-full flex flex-row justify-center items-center">
        {children}
      </View>
    </Modal>
  );
};

export default ModalFull;

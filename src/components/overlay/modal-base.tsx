import { Text, View } from "react-native";
import { Modal } from "react-native-paper";
import { ModalBaseProps } from "../../types";
import { Button } from "../general";

const ModalBase = ({
  title,
  titleConfirm = "Confirmar",
  isOpen,
  onClose,
  onConfirm,
  children,
}: ModalBaseProps) => {
  const containerStyle = {
    backgroundColor: "white",
    padding: 20, 
    borderRadius: 30,
    alignSelf: "center",

  } as any;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      onDismiss={onClose}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'flex-start',
        paddingTop: 32,
      }}
      contentContainerStyle={containerStyle}
    >
      <View className=" justify-around items-center">
        <Text className="text-[20px] text-textPrimary w-full mb-4">
          {title}
        </Text>
        {
          children
        }
        <View className="w-full flex flex-col-reverse justify-between">
          <Text className="text-[14px] text-[#083061] font-bold text-center mt-4"
            onPress={onClose}
          >
            Cancelar
          </Text>
          <Button
            title={titleConfirm} 
            onPress={handleConfirm}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalBase;

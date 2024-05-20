import { Text, View } from "react-native";
import { Icon, Modal } from "react-native-paper";
import { ModalFullProps } from "../../types"; 
import { TouchableOpacity } from 'react-native';
import { ScrollView } from 'native-base';

const ModalScreen = ({
  title,
  isOpen,
  onClose,
  children,
  styles,
  blueArrow
}: ModalFullProps) => { 

  const containerStyle = styles ? {
    width: '100%',
    height: '100%', 
    alignSelf: "center", 
    ...styles
  } : {
    backgroundColor: "#F8F9FA", 
    width: '100%',
    height: '100%', 
    alignSelf: "center", 
  }

  return (
    <Modal
      visible={isOpen}
      onDismiss={onClose}
      contentContainerStyle={containerStyle}
      overlayAccessibilityLabel='Overlay'
    >
      <ScrollView
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <View
          className="w-full flex flex-row justify-start items-center p-4">
            {
              onClose &&<TouchableOpacity
                onPress={onClose}
              >
                  <Icon
                  source='chevron-left'
                  size={blueArrow ? 32 : 20}
                  color={blueArrow ? '#083061' : '#000'}
                />
              </TouchableOpacity>
            }
            
            {
              title && <Text
                className='text-xl font-bold ml-2'
              >
                {title}
              </Text>
            }
        </View>
        <View className="w-full flex flex-row justify-center items-center">
          {children}
        </View>
      </ScrollView>

    </Modal>
  );
};

export default ModalScreen;

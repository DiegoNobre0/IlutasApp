import { Alert } from "react-native";
import {
  launchImageLibraryAsync,
  launchCameraAsync,
  MediaTypeOptions,
} from "expo-image-picker";

export const handleImage = (
  onImageUrlChange: (image: string | undefined) => void
) => {
  Alert.alert(
    "Selecione",
    "Informe o local de onde você quer pegar a foto",
    [
      {
        text: "Galeria",
        onPress: () => PickImageFromGalery(onImageUrlChange),
        style: "default",
      },
      {
        text: "Camera",
        onPress: () => PickImageFromCamera(onImageUrlChange),
        style: "default",
      },
    ],
    {
      cancelable: true,
    }
  );
};

const PickImageFromGalery = async (
  onImageUrlChange: (image: string | undefined) => void
) => {
  const result = await launchImageLibraryAsync({
    mediaTypes: MediaTypeOptions.All,
    allowsEditing: true,
    quality: 1,
  })
    .then((response) => {
      const source = response?.assets ? response?.assets[0].uri : undefined;
      source && onImageUrlChange(source);
      return source;
    })
    .catch((e) => {
      console.error("error: ", e);
    });

  return result;
};

const PickImageFromCamera = async (
  onImageUrlChange: (image: string | undefined) => void
) => {
  const result = await launchCameraAsync({
    mediaTypes: MediaTypeOptions.All,
    allowsEditing: true,
    quality: 1,
  })
    .then((response) => {
      const source = response?.assets ? response?.assets[0].uri : undefined;
      source && onImageUrlChange(source);
      return source;
    })
    .catch((e) => {
      console.error("error: ", e);
    });

  return result;
};

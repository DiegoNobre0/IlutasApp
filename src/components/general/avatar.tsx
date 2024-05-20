import { Image, Text, View } from 'native-base';

interface AvatarProps {
  src?: string;
  userName: string;
  size: number;
  className?: string;
}

function changeBackgroundOnFirstLetter(userName: string) {
  //get position on the alphabet of the first letter of the name and use it to get a color from the array

  const colors = ['#FFB02E', '#77FAB0', '#083061', '#FFFCE2', '#BEBEBE', '#CD7F32'];
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const firstLetter = userName[0].toLowerCase();
  const position = alphabet.indexOf(firstLetter);
  const firstLetterColor = colors[position % colors.length];
  return {firstLetterColor};
}

export const Avatar = (props: AvatarProps) => {
  return (
    <View className={props.className}>
      {
        props?.src ? 
        <Image
          source={{uri: props.src}}
          alt={props.userName[0]}
          className={`rounded-full `}
          style={{
            width: props.size,
            height: props.size,
          }}
        /> 
        : <View
          className={`rounded-full  flex justify-center items-center`}
          style={{
            width: props.size,
            height: props.size,
            backgroundColor: changeBackgroundOnFirstLetter(props.userName).firstLetterColor 
          }}
        >
          <Text
            className='text-[#494949] text-lg text-center '
          >
            {props.userName[0]}
          </Text>
        </View>
      }
    </View>
  );
}
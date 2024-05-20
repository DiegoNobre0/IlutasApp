import { Box, Text, View } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';

type FeedbackCardProps = {
    type?: 'error' | 'success';
    title: string;
    description: string | React.ReactNode;
    onPress: () => void;
};


export function FeedbackCard(props: FeedbackCardProps) {

    const styles = {
        container: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#e5e5e5",
        }, 
        title: {
            fontSize: 16, 
            color: props.type === 'error' ? '#8D0000' : '#006121',
            fontWeight: 'bold',
        },
        description: {
            fontSize: 14,
            color: props.type === 'error' ? '#8D0000' : '#006121',
            
        },
    };

    return (
        <TouchableOpacity
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 8,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: props.type === 'error' ? '#8D0000' : '#006121',
              backgroundColor: props.type === 'error' ? '#FFF4F4' : '#F4FFF6',
              gap: 4,
            }}
            onPress={props.onPress}
        >
          <Box
            className='flex flex-row justify-between items-center w-full'>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center', 
                gap: 8,
              }}>
                  <Icon
                    source={'alert-circle-outline'}
                    size={24}
                    color={ props.type === 'error' ? '#8D0000' : '#006121'}
                  />
                  <Text style={styles.title as any}>{props.title}</Text>
              </View>
              <Icon
                source={'close'}
                size={20}
                color={ props.type === 'error' ? '#8D0000' : '#006121'}
              />

            </Box>

                <Text style={styles.description}>{props.description}</Text>
        </TouchableOpacity>
    );
}

  
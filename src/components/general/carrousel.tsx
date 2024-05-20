import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

function Carrousel({
  children,
  height = 500
} : {
  children: React.ReactNode[],
  height?: number
}
) {
    const width = Dimensions.get('window').width;
    const [currentIndex, setCurrentIndex] = React.useState(0);

    return (
      <>
        <View style={{ flex: 1 }}>
            <Carousel
                width={width}
                height={height}
                autoPlay={false}
                data={
                  children
                }   
                overscrollEnabled={false}
                onProgressChange={(_, progress : any) => {
                  console.log(progress)
                  setCurrentIndex(Math.ceil(progress))
                }}
                renderItem={({ item }) => (
                    <View
                        style={{
                          width: width -40,
                        }}
                    >
                        {item}
                    </View>
                )}
            />
        </View>
        
        <View
          className='flex flex-row justify-center gap-4 pt-4'
        >
              {
                children.map((_, index) => (
                  <View
                    key={index}
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 50,
                      backgroundColor: currentIndex === index ? '#083061' : '#D4D4D4',
                      margin: 4,
                    }}
                  />
                ))
              }
            </View>
      </>
    );
}

export default Carrousel;
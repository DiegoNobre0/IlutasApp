import { Box, Text, View } from 'native-base';
import { Competidor } from 'src/domain-types';

interface ResultCardProps {
  category: string;
  subCategory: string;
  results: {
    firstPlace?: Competidor
    secondPlace?: Competidor
  }
  onClick: () => void;
}

const Medal = ({place} : {place: number}) => {
  return (
    <View
      className='flex justify-center items-center rounded-full w-8 h-8 p-[3px] mr-4'
      style={{
        backgroundColor: place === 1 ? '#FFB02E' : place === 2 ? '#BEBEBE' : '#CD7F32'
      }}
    >
      <Text
        className='text-white font-bold h-full w-full rounded-full items-center justify-center text-center self-center border-[2px] border-white text-base'
        style={{
          borderColor: place === 1 ? '#FCD53F' : place === 2 ? '#E6E6E6' : '#CD7F32',
          color: place === 1 ? '#6D4534' : place === 2 ? '#636363' : '#E6E6E6'
        }}
      >
        {place}
      </Text>
    </View>
  )
}

export const ResultCard = (props: ResultCardProps) => { 

  return (
    <View
     className=' bg-white p-5 rounded-lg'
    >
      <Box>
        <Text
          className='text-base text-[#494949]'
        >
          {props.category}
        </Text>
        <Text
          className='text-base font-normal text-[#000]'
        >
          {props.subCategory}
        </Text>
      </Box>
      <View 
        className='flex flex-row items-center pt-3'
      >
        <Medal place={1}/>
        <Box
          className='flex flex-col w-3/4 h-full'>
          <Text
            className='text-[#494949]'
          >
            {props.results.firstPlace?.nome}
          </Text>
          <Text
            className='text-[#494949]'
          >
            {props.results.firstPlace?.team.name}
          </Text>
        </Box>
      </View>
      {
        props.results.secondPlace && <View 
        className='flex flex-row items-center pt-3'
      >
        <Medal place={2}/>
        <Box
          className='flex flex-col w-3/4 h-full'>
          <Text
            className='text-[#494949]'
          >
            {props.results.secondPlace?.nome}
          </Text>
          <Text
            className='text-[#494949]'
          >
            {props.results.secondPlace?.team.name}
          </Text>
        </Box>
      </View>}
    </View>
  );
}
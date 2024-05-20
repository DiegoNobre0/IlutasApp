import { Box, Select, Text, View } from 'native-base';
import { useState } from 'react';
import { Icon } from 'react-native-paper';
import { ModalScreen, SearchFieldInput, SelectField } from 'src/components';
import { Avatar } from 'src/components/general/avatar';
import { Evento } from 'src/domain-types';
import { SelectOptionsProps } from 'src/types';

export function ModalListagemAtletas(
  {
    isOpen,
    onClose,
    event
  }: {
    isOpen: boolean;
    onClose: () => void;
    event: Evento
  }
){

  const [options, setOptions] = useState<SelectOptionsProps[]>([{
    name: 'Modalidade',
    value: 'modalidade'
  },
  {
    name: 'Categoria',
    value: 'categoria'
  },
  {
    name: 'Nome',
    value: 'nome'
  }
])

  const [selectedOption, setSelectedOption] = useState<string>('Modalidade')

  const [service, setService] =  useState("");
    return (
      <ModalScreen
        title='Inscrição'
        isOpen={isOpen}
        onClose={onClose}
      >
        <Box
          className='w-full flex flex-col justify-start p-4'
        >
          <Text
            className='text-lg font-bold w-full text-start'
          >
            {
              event.name
            }
          </Text>
          <Text
            className='text-base w-full text-start mt-2'
          >
            Lista de atletas:
          </Text> 
          <SelectField
            options={options}
            value={selectedOption}
            variant='secondary'
            onChange={(value: any) => setSelectedOption(value)}
          />
          <SearchFieldInput
            value={service}
            onChange={(value) => setService(value)} 
          />
          <Box>

          {
            event.competitors.map((competitor, index) => {
              return (
                <View
                  className='flex flex-row justify-between w-full mb-3 bg-white rounded-xl px-4 py-4 '
                  key={index}
                >
                  <Avatar
                    size={36} 
                    src={competitor.urlImagem}
                    userName={competitor.nome}
                  />
                  <View
                    className='flex flex-col w-[85%] pl-4'
                  >
                    <Text
                      className='text-base text-black'
                    >
                      {
                        competitor.nome
                      }
                    </Text>
                    <Text
                      className='text-[#494949]'
                    >
                      {
                        competitor.modality
                      }
                    </Text>
                    <Text
                      className='text-[#494949]'
                    >
                      {
                        competitor.category
                      }
                    </Text>
                    <Text
                      className='text-[#494949]'
                    >
                      {
                        competitor.team.name
                      }
                    </Text>
                    <Text
                      className='text-[#494949]'
                    >
                      {
                        competitor.team.teacher
                      }
                    </Text>
                    <Text
                      className='text-[#494949]'
                    >
                      {
                        competitor.id
                      }
                    </Text>

                    <View
                      className='flex mt-4 w-[180px] '
                    >
                      <Text
                        color={'#0A8D44'}
                        className='text-center bg-[#77FAB0] p-2 rounded-[18px] ' 
                      >
                        Pagamento confirmado!
                      </Text>
                    </View>


                  </View>
                    <Icon
                      source='dots-horizontal'
                      size={20}
                      color='#000'
                    />

                </View>
              )
          }
          )}
          </Box>

        </Box>

      </ModalScreen>
    )
}
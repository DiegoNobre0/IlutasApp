import { Box, Text } from 'native-base';
import { useEffect, useState } from 'react';
import { ModalScreen, SearchFieldInput, SelectField } from 'src/components';
import { ResultCard } from 'src/components/related/result-card';
import { Evento } from 'src/domain-types';
import { SelectOptionsProps } from 'src/types';

export const ModalResultados = ({
  isOpen,
  onClose,
  event
}: {
  isOpen: boolean;
  onClose: () => void;
  event: Evento;
}
) => {


  const [categories, setCategories] = useState<SelectOptionsProps[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  function fetchCategories() {
    setCategories(event.results.map((result) => ({name: result.modality, value: result.modality})));
  }

  useEffect(() => {
    fetchCategories();
  }, [event]);


  return( 
      <ModalScreen
        title='Resultados do evento'
        isOpen={isOpen}
        onClose={onClose}
      >
        <Box
          className='w-full flex flex-col justify-start p-4 h-full'
        >
          <Text
            className='text-lg font-bold w-full text-start'
          >
            Categorias
          </Text>
          <Text
            className='text-base w-full text-start mt-2'
          >
            Tipos de categoria
          </Text>  
          <Box
            className='w-full mt-2 mb-4'
          >
            <SelectField
              value={selectedCategory}
              options={categories}
              onChange={(value) => setSelectedCategory(value)}
              variant='primary'
            />
          </Box>

          <Box>
            {
              event.results.map((result, index) => (
                <ResultCard
                  category={result.modality }
                  results={{
                    firstPlace: result.results.firstPlace,
                    secondPlace: result.results.secondPlace
                  }}
                  onClick={() => {}}
                  subCategory={result.category}
                />
              ))
            }

          </Box>

        </Box>

      </ModalScreen>
  )
}

import { Box, Checkbox, Radio, Stack, Text } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CheckBoxProps {
  value: boolean;
  label: string;
  onChange: (value: boolean) => void;
  options?: Array<{
    label: string;
    value: string;
  }>;
}

interface RadioPropsFlex {
  value: string;
  label: string | number;
  onChange: (value: string) => void;
  options?: Array<{
    label: string;
    value: string | number;
  }>;
}

export function RadioForm({ label, value, onChange, ...rest } : CheckBoxProps) {
  return (
    <Box className="flex flex-col items-start">
      {
        label && (
          <Text className="text-sm font-medium mb-2">
            {label}
          </Text>
        )
      }
      <Radio.Group
        name={label} 
        className='mb-3'
        onChange={(value) => 
          onChange(value === "Sim" ? true : false)
        }
        
      >
        <Radio 
          value={"Sim"}     
          _icon={{
            color: "#083061",
            borderColor: "#083061", 
          }}
          _checked={{
            borderColor: "#083061",
            color: "#083061",
          }}
          _unchecked={{
            borderColor: "#083061",
            color: "#083061",
          }}
          className="mb-1"
        >
          <Text>
            Sim
          </Text>
        </Radio>
        <Radio 
          value={"Não"} 
          _icon={{
            color: "#083061",
            borderColor: "#083061",
          }}
        >
          <Text>
            Não
          </Text>
        </Radio>
        
      </Radio.Group>
    </Box>
  );
}

export function RadioGroupFlex({ label, value, onChange, ...rest } : RadioPropsFlex) {
  return (
    <Box className="flex gap-2"> 
      {
        label && (
          <Text className="text-sm font-medium mb-2">
            {label}
          </Text>
        )
      }
      <Radio.Group
        name={label as string}       
        className='mb-3 '
        onChange={(value) => 
          onChange(value)
        }
        value={value}
        >
          <Stack direction="row" space={4}>
            {
              rest.options?.map((option) => (
                <Radio 
                  key={option.value}
                  value={option.value as string}   
                  _icon={{
                    color: "#083061",
                    borderColor: "#083061", 
                  }}
                  _checked={{
                    borderColor: "#083061",
                    color: "#083061",
                  }}
                  _unchecked={{
                    borderColor: "#083061",
                    color: "#083061",
                  }}
                  className="flex"
                > 
                  <Text>
                    {option.label}
                  </Text>
                </Radio>
              ))
            }
          </Stack> 
      </Radio.Group>
    </Box>
  );
}
import { Box, Input, Text } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { TextInput } from 'react-native-paper';

interface InputCodeProps {
  setCodigoValido: (data: boolean) => any;
  dispositivo: string;
  getCode: (email: string) => any;
}

export const CodeInput = ({
  setCodigoValido,
  dispositivo,
  getCode,
}: InputCodeProps) => {

  const [digits, setDigits] = useState<any[]>(["", "", "", "", "", ""]);
  const [codigo, setCodigo] = useState<string>();
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [showTimeLeft, setShowTimeLeft] = useState<boolean>(true);

  const refs = [
      useRef<HTMLInputElement>(null) as any,
      useRef<HTMLInputElement>(null) as any,
      useRef<HTMLInputElement>(null) as any,
      useRef<HTMLInputElement>(null) as any,
      useRef<HTMLInputElement>(null) as any,
      useRef<HTMLInputElement>(null) as any,
  ];
  const timeoutRef = useRef() as any;

  const fetchData = React.useCallback(async () => {
      try {
          const codigo = await getCode(dispositivo);
          setCodigo(codigo);
      } catch (err) {
          console.error(err);
      }
  }, []);

  useEffect(() => {

      const intervalId = setInterval(() => {
          setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);

      if(timeLeft <= 0) {
          setShowTimeLeft(false);
      }
  
      return () => {
        clearInterval(intervalId);
      };
    }, [timeLeft]);


  useEffect(() => {
      timeoutRef.current = setTimeout(() => {
          fetchData();
      }, 500);

      return () => {
          clearTimeout(timeoutRef.current);
      };
  }, [fetchData]);

  useEffect(() => {
      const newDigits = [...digits];
      const combinedDigits = parseInt(newDigits.join(""));

      if (combinedDigits.toString() == codigo) {
          setCodigoValido(true);
          setShowWrongCode(false);
      } else {
          if(combinedDigits.toString().length == 4)
              setShowWrongCode(true);
          else
              setShowWrongCode(false);
          setCodigoValido(false);
      }
  }, [digits]);

  const setNewDigits = (index: number, digits: any, value: number) => {
      if (index < 65) {
          if (digits[index].length == 0) {
              digits[index] = value;
              setDigits(digits);
          }
      }
  };

  const handleSendNewCode = React.useCallback(() => {
      fetchData();
      setTimeLeft(60);
      setShowTimeLeft(true);
  }, [fetchData,setTimeLeft, setShowTimeLeft]);

  const handleInputChange = (index: number, value: any) => {
  
      let newDigits = [...digits];

      if (value?.length >= 4 && !newDigits[index + 1]) {
          switch (value.length) {
              case 2:
                  setNewDigits(index, newDigits, value[0]);
                  setNewDigits(index + 1, newDigits, value[1]);

                  if (index < 2) {
                      refs[index + 2].current?.focus();
                  } else if(index < 3) {
                      refs[index + 1].current?.focus();
                  }
                  break;
              case 3:
                  setNewDigits(index, newDigits, value[0]);
                  setNewDigits(index + 1, newDigits, value[1]);
                  setNewDigits(index + 2, newDigits, value[2]);

                  if (index < 1) {
                      refs[index + 3].current?.focus();
                  } else if (index >= 1 && index < 2) {
                      refs[index + 2].current?.focus();
                  } else if (index >= 2 && index < 3) {
                      refs[index + 1].current?.focus();
                  }
                  break;
              case 4:
                  setNewDigits(index, newDigits, value[0]);
                  setNewDigits(index + 1, newDigits, value[1]);
                  setNewDigits(index + 2, newDigits, value[2]);
                  setNewDigits(index + 3, newDigits, value[3]);
                  if (index < 1) {
                      refs[index + 3].current?.focus();
                  } else if (index >= 1 && index < 2) {
                      refs[index + 2].current?.focus();
                  } else if (index >= 2 && index < 3) {
                      refs[index + 2].current?.focus();
                  }
                  break;
              case 5:
                  setNewDigits(index, newDigits, value[0]);
                  setNewDigits(index + 1, newDigits, value[1]);
                  setNewDigits(index + 2, newDigits, value[2]);
                  setNewDigits(index + 3, newDigits, value[3]);
                  if (index < 1) {
                      refs[index + 3].current?.focus();
                  } else if (index >= 1 && index < 2) {
                      refs[index + 2].current?.focus();
                  } else if (index >= 2 && index < 3) {
                      refs[index + 2].current?.focus();
                  }
                  break;
              default:
                  setNewDigits(index, newDigits, value[0]);
                  setNewDigits(index + 1, newDigits, value[1]);
                  setNewDigits(index + 2, newDigits, value[2]);
                  setNewDigits(index + 3, newDigits, value[3]);
                  if (index < 1) {
                      refs[index + 3].current?.focus();
                  } else if (index >= 1 && index < 2) {
                      refs[index + 2].current?.focus();
                  } else if (index >= 2 && index < 3) {
                      refs[index + 2].current?.focus();
                  }
                  break;
          }

          return;
      }
      if (value) {
          if (digits[index]) {
              newDigits[index] = value[1];
          } else {
              newDigits[index] = value;
          }
          setDigits(newDigits);

          if (value && refs[index + 1] && index < 5) {
              refs[index + 1].current?.focus();
          } else if (index > 0 && !value && refs[index - 1]) {
              refs[index - 1].current?.focus();
          }
      }
  };

  const handleInputKeyDown = (index: number, event: NativeSyntheticEvent<TextInputKeyPressEventData>) => { 
    console.log(event.nativeEvent.key)
      if (event.nativeEvent.key === "Backspace") {
          const newDigits = [...digits];
          newDigits[index] = "";
          setDigits(newDigits);

          if (refs[index] && index > 0) {
              refs[index - 1].current.focus();
          }
      } 
  };

  const [showWrongCode, setShowWrongCode] = useState(false);

  return (
    <Box
      className="w-full flex flex-col justify-center items-center"
      >
        <Box
          className="w-full flex flex-col justify-center items-center"
        >
          <Box
            className="flex flex-row justify-center items-center gap-2"
          >
            <TextInput
              ref={refs[0]}
              className="w-12 h-12 text-center bg-white border-2 border-[#00000000] focus:border-primary rounded-lg flex items-center justify-center text-primary font-bold text-2xl" 
              value={digits[0]}
              onChangeText={(e) => handleInputChange(0, e)}
              onKeyPress={(e) => handleInputKeyDown(0, e)}
              maxLength={1}
            />
            <TextInput
              ref={refs[1]}
              className="w-12 h-12 text-center bg-white border-2 border-[#00000000] focus:border-primary rounded-lg flex items-center justify-center text-primary font-bold text-2xl" 
              value={digits[1]}
              onChangeText={(e) => handleInputChange(1, e)}
              onKeyPress={(e) => handleInputKeyDown(1, e)}
              maxLength={1}
            />
            <TextInput
              ref={refs[2]}
              className="w-12 h-12 text-center bg-white border-2 border-[#00000000] focus:border-primary rounded-lg flex items-center justify-center text-primary font-bold text-2xl" 
              value={digits[2]}
              onChangeText={(e) => handleInputChange(2, e)}
              // onChange={(e) => handleInputChange(2, e)}
              onKeyPress={(e) => handleInputKeyDown(2, e)} 
              maxLength={1}
            />
            <TextInput
              ref={refs[3]}
              className="w-12 h-12 text-center bg-white border-2 border-[#00000000] focus:border-primary rounded-lg flex items-center justify-center text-primary font-bold text-2xl" 
              value={digits[3]}
              onChangeText={(e) => handleInputChange(3, e)}
              onKeyPress={(e) => handleInputKeyDown(3, e)}
              maxLength={1}
            />
            <TextInput
              ref={refs[4]}
              className="w-12 h-12 text-center bg-white border-2 border-[#00000000] focus:border-primary rounded-lg flex items-center justify-center text-primary font-bold text-2xl" 
              value={digits[4]}
              onChangeText={(e) => handleInputChange(4, e)}
              onKeyPress={(e) => handleInputKeyDown(4, e)}
              maxLength={1}
            />
            <TextInput
              ref={refs[5]}
              className="w-12 h-12 text-center bg-white border-2 border-[#00000000] focus:border-primary rounded-lg flex items-center justify-center text-primary font-bold text-2xl" 
              value={digits[5]}
              onChangeText={(e) => handleInputChange(5, e)}
              onKeyPress={(e) => handleInputKeyDown(5, e)}
              maxLength={1}
            />
          </Box>
          {showWrongCode && <Box className="w-full text-center text-danger font-bold text-sm mt-2">Código inválido</Box>}
          {showTimeLeft && <Box className="w-full text-center text-primary font-bold text-sm my-4 pt-2 flex-row gap-2 items-start px-2">Reenviar código em {timeLeft} segundos</Box>}
          {!showTimeLeft && <Text className="w-full text-start text-textSecondary font-normal text-sm my-4" > 
          Não recebeu o código?
          <Text
            className="font-bold text-sm"
            onPress={handleSendNewCode}
          >
             Reenvie aqui.
          </Text>
          </Text>}
        </Box>

    </Box>
  )

}

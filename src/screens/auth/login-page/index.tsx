import { useEffect, useState, useRef } from "react";
import { Box, Text, Image, ScrollView, KeyboardAvoidingView} from "native-base";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import {
  LoginUserFormInput,
  loginUserValidationSchema,
} from "../../../domain-types";
import LoginForm from "./components/login-form";
import { AuthService } from "../../../services";
import { useAuth, useKeyboardVisible, useModal } from "../../../core"; 
import { Animated } from 'react-native';
import ResetPasswordForm from './components/reset-password-form';
import { PaperProvider, Portal } from 'react-native-paper';
import RegisterForm from './components/register-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { KeyboardScrollView } from 'src/components'; 
import { ModalCadastroEquipe } from './components/modal-cadastro-equipe';
import { ModalCadastroProfessor } from './components/modal-cadastro-professor';

const LoginPage = () => {
  const { saveAccessToken, saveCurrentAccountToken } = useAuth();
  const [formStep, setFormStep] = useState< 'login' | 'reset-password' | 'create-account' | 'create-account-step-2'>('login');
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<LoginUserFormInput>({
    resolver: yupResolver(loginUserValidationSchema),
    mode: "onChange",
  });

  const changeForm = (formName: 'login' | 'reset-password' | 'create-account' | 'create-account-step-2') => {
    setFormStep(formName);
  }


  const onSubmit: SubmitHandler<LoginUserFormInput> = async (data) => {
    setIsloading(true);
    // const response = await AuthService.loginUsuario({ data })
    const response = '123'
    console.log(response)
    const user = await AuthService.GetCurrentAccount();
    console.log('user', user)

    saveAccessToken(response);

    saveCurrentAccountToken(user);
    setIsloading(false);
  };
  
  const [animationStep, setAnimationStep] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      animationStep < 2 && setAnimationStep((prev) => (prev + 1)); 
    }, 1250);
    return () => clearInterval(interval);
  }, []);
  
  
 
  const translateXValue = useRef(new Animated.Value(0)).current;
  const fadeInText = useRef(new Animated.Value(0)).current;

  const [isModalEquipeOpen, openModalEquipe, closeModalEquipe] = useModal();
  const [isModalProfessorOpen, openModalProfessor, closeModalProfessor] = useModal();


  useEffect(() => {
    const translateAnimation = Animated.timing(
      translateXValue,
      {
        toValue: -100, // valor de deslocamento para a esquerda
        duration: 400, // duração da animação em milissegundos
        delay: 100, // atraso de 3 segundos
        useNativeDriver: true,
      }
    );

    const fadeInAnimation = Animated.timing(
      fadeInText,
      {
        toValue: 1, // opacidade completa
        duration: 300, // duração da animação em milissegundos
        delay: 150, // começa após 500ms do término da animação de translateX
        useNativeDriver: true,
      }
    );

    const animationSequence = Animated.sequence([
      translateAnimation,
      fadeInAnimation
    ]);

    animationSequence.start();

    return () => animationSequence.stop();
  }, [translateXValue, fadeInText]);
 


  return (
    <PaperProvider>
      <Portal> 

        <Box className="h-full bg-background flex flex-col justify-center items-center relative">
            { 
            animationStep > 1 &&  
            <Box
              className="w-full h-full  flex-col justify-between items-center" 
            > 
              <Box className=" p-[25%] items-center justify-center "
                style={
                  (formStep === 'login' || formStep === 'create-account-step-2') ? {
                  } : {
                    paddingTop: '25%'
                  }
                }
              >
                  <Box className="items-center  w-[228px] relative z-10">
                    <Image
                      source={require("../../../assets/Logo-Fed.png")}
                      alt="logo-img"
                      className="w-[120px] h-[120px] object-contain"
                      /> 
                  </Box>
              </Box>  
            <Box
              className='w-full pt-12 px-5 bg-[#F2F2F2] shadow-2xl justify-center items-center rounded-t-[42px]'  
            > 


                <ScrollView   
                  className='w-full'
                  style={
                    (formStep === 'login') ? {
                      height: '60%'
                    } :
                    formStep === 'create-account-step-2' ? {
                      height: '75%'
                    }
                    :
                    {
                      height: 350
                    }
                  }
                >

                  {
                    formStep === 'login' && (
                      <FormProvider {...form}>
                        <LoginForm onSubmit={onSubmit} isLoading={isLoading} 
                          changeForm={changeForm}
                        />
                      </FormProvider>
                    )  
                  }
                  
              <KeyboardAwareScrollView
                enableAutomaticScroll={true}
                enableOnAndroid={true}
                extraScrollHeight={50}
                enableResetScrollToCoords={true}
                contentContainerStyle={{
                  flexGrow: 1, 
                  width: '100%',
                }}
                keyboardShouldPersistTaps='handled'
                showsVerticalScrollIndicator={false}
              >

                  {
                    formStep === 'reset-password' && (
                        <ResetPasswordForm  isLoading={isLoading} 
                          changeForm={changeForm}
                          />
                    )
                  }
                  {
                    (formStep === 'create-account' || formStep ==='create-account-step-2') && (
                      <RegisterForm  isLoading={isLoading} 
                        changeForm={changeForm}
                        openModalEquipe={openModalEquipe}
                        openModalProfessor={openModalProfessor}
                        />
                    )
                  } 
                </KeyboardAwareScrollView>

                </ScrollView> 

            </Box> 
          </Box>

          }  
          {
            animationStep === 1 && (
            <Animated.View
              style={{
                borderRadius: 3,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 12,
                marginRight: 0,
                transform: [{ translateX: translateXValue }],
              }}
            >
              <Box className="flex flex-row justify-center items-center w-[150%] gap-2"
              >
                <Image
                  source={require("../../../assets/Logo-Fed.png")}
                  alt="logo-img"
                  className="w-[100px] h-[100px] object-contain"
                />
                  <Animated.Text
                    style={{
                      opacity: fadeInText, 
                      fontSize: 64,
                      fontWeight: 'bold',
                    }}
                  >
                    FCJJE
                  </Animated.Text>
              </Box>

          </Animated.View>
            )

          }
    
        </Box> 
        
        {
          isModalEquipeOpen && <ModalCadastroEquipe
            isOpen={isModalEquipeOpen}
            onClose={closeModalEquipe}
            onSubmit={() => {}}
          />
        }
        {
          isModalProfessorOpen && <ModalCadastroProfessor
            isOpen={isModalProfessorOpen}
            onClose={closeModalProfessor}
            onSubmit={() => {}}
          />
        } 

      </Portal>
    </PaperProvider>

  );
};

export default LoginPage;

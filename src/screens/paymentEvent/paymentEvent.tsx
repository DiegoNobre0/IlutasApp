import { useEffect, useState } from 'react'
import { EventInformation, Evento } from 'src/domain-types'
import { mockEvento } from './mock'
import { Accordion, Box, Image, ScrollView, Switch, Text, View } from "native-base";
import { Icon, IconButton, PaperProvider, Portal, RadioButton } from 'react-native-paper';
import { Button, FeedbackCard, Field, HeaderHome, KeyboardScrollView, LinkCard, ModalFull, ModalScreen, TextFieldInput } from 'src/components';
import { Share, TouchableOpacity, StyleSheet } from 'react-native';
import { useModal } from 'src/core';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Linking } from 'react-native';
import dayjs from 'dayjs';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const shareWhatsApp = (text: string) => {
    Linking.openURL(`whatsapp://send?text=${text} + \n + ${text}`);
}


export const PaymentEventPage = (navigation: {
    route: {
        params: {
            id?: string
        }
    },
    goBack: () => void
}) => {

    const { control, formState, handleSubmit } = useForm<any>();

    const onSubmit = (data: any) => {
        console.log(data);       
    };

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    const [selectedOption, setSelectedOption] = useState<any>(null);
    const [selectedOptionAdress, setSelectedOptionAdress] = useState<any>(null);

    const [event, setEvent] = useState<Evento | undefined>()

    const fetchEvent = async (id: string) => {
        // const response = await fetch(`https://api.example.com/events/${id}`)
        // const data = await response.json()
        // return data
        const data = mockEvento
        setEvent(data)

    }

    useEffect(() => {
        const id = navigation?.route.params.id
        if (!id) return

        fetchEvent(id)
    }, [navigation?.route.params.id])

    const navigate = useNavigation()

    return (
        <PaperProvider>
            <Portal>
                <ScrollView className='w-full h-full py-4'>
                    <Box className="h-full w-full flex flex-col mt-4 px-6 pb-4">
                        <View className='flex flex-row justify-start gap-0 items-center w-full pb-5'>
                            <TouchableOpacity onPress={() => navigate.goBack()} className='flex items-center justify-center rounded-full w-6 h-10'>
                                <Icon source='chevron-left' size={24} color='#000' />
                            </TouchableOpacity>
                            <Text className="text-base font-medium text-start" style={{ fontSize: 19 }}>
                                Pagamento de ingressos
                            </Text>
                        </View>

                        <Box style={{ padding: 8 }}>
                            <Box className='flex flex-col pb-3'>
                                <Text className='text-xl font-bold mt-2 pb-3 pt-3' style={{ fontWeight: 500 }}>
                                    Resumo do pagamento
                                </Text>
                                <View style={{ borderBottomColor: '#CACACA', borderBottomWidth: 1 }}>
                                </View>
                                <Box className='flex flex-row'>
                                    <Box className='flex flex-col pt-4 pb-3'>
                                        <Text className='text-xl font-bold mt-2' style={{ fontWeight: 400, fontSize: 14, color: '#494949', lineHeight: 17 }}>
                                            Nome do evento
                                        </Text>
                                        <Text className='text-xl font-bold mt-2' style={{ fontWeight: 400, fontSize: 14, color: '#494949', lineHeight: 17 }}>
                                            04 ingressos
                                        </Text>
                                        <Text className='text-xl font-bold mt-2' style={{ fontWeight: 400, fontSize: 14, color: '#27BD69', lineHeight: 17 }}>
                                            Valor total R$100,00
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>

                            <Box className='flex flex-col pb-3'>
                                <Text className='text-xl font-bold mt-2 pb-3 pt-3' style={{ fontWeight: 500 }}>
                                    Voucher e créditos
                                </Text>
                                <View style={{ borderBottomColor: '#CACACA', borderBottomWidth: 1, marginBottom: 10 }}>
                                </View>
                                <Controller
                                    control={control}
                                    name=""
                                    render={({ field: { value, onChange }, ...rest }) => (
                                        <>
                                            <TextFieldInput
                                                value={value}
                                                label=''
                                                onChangeText={onChange}
                                                placeholder="12345LUTAS"
                                                placeholderTextColor="gray"
                                                // error={formState.errors.estado?.message}
                                                {...rest}

                                            />
                                            <Text style={{ color: '#27BD69', fontSize: 12, marginTop: -10 }}>
                                                Você usou um Voucher no valor de R$50,00!
                                            </Text>
                                        </>
                                    )}
                                />
                                <View style={styles.switchContainer}>
                                    <Switch
                                        trackColor={{ false: "white", true: "#083061" }}
                                        thumbColor={isEnabled ? "white" : "white"}
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                        style={styles.switch}
                                    />
                                    <Text style={styles.switchText}>
                                        Aplicar o crédito de R$300,00
                                    </Text>
                                </View>

                                <Text className='text-xl font-bold mt-2 pt-3' style={{ fontWeight: 500 }}>
                                    Resumo do pagamento
                                </Text>
                                <Box className='flex flex-row'>
                                    <Box className='flex flex-col pt-4 pb-3'>
                                        <Text className='text-xl font-bold mt-2' style={{ fontWeight: 'bold', fontSize: 14, color: '#494949', lineHeight: 16 }}>
                                            Valor anterior: <Text style={{ fontWeight: 400 }}>R$00</Text>
                                        </Text>
                                        <Text className='text-xl font-bold mt-2' style={{ fontWeight: 'bold', fontSize: 14, color: '#494949', lineHeight: 16 }}>
                                            Valor do Voucher: <Text style={{ fontWeight: 400 }}>R$00</Text>
                                        </Text>
                                        <Text className='text-xl font-bold mt-2' style={{ fontWeight: 'bold', fontSize: 14, color: '#494949', lineHeight: 16 }}>
                                            Desconto do Voucher: <Text style={{ fontWeight: 400 }}>R$00</Text>
                                        </Text>
                                        <Text className='text-xl font-bold mt-2' style={{ fontWeight: 'bold', fontSize: 14, color: '#494949', lineHeight: 16 }}>
                                            Diferença após uso do crédito: <Text style={{ fontWeight: 400 }}>R$00</Text>
                                        </Text>
                                        <Text className='text-xl font-bold mt-2' style={{ fontWeight: 'bold', fontSize: 14, color: '#27BD69', lineHeight: 16 }}>
                                            Novo valor: <Text style={{ fontWeight: 400 }}>R$00</Text>
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>

                            <Box className='flex flex-col pb-3'>
                                <Text className='text-xl font-bold mt-2 pb-3 pt-3' style={{ fontWeight: 500 }}>
                                    Método de pagamento
                                </Text>
                                <View style={{ borderBottomColor: '#CACACA', borderBottomWidth: 1, marginBottom: 10 }}>
                                </View>
                                <View style={styles.container}>
                                    <RadioButton.Group
                                        onValueChange={(value) => setSelectedOption(value)}
                                        value={selectedOption}
                                    >
                                        <View style={[styles.optionContainer, selectedOption === 'Pix' && styles.selectedOption]}>
                                            <FontAwesome6 name="pix" size={24} color={selectedOption === 'Pix' ? styles.radioButton.color : 'black'} />
                                            <Text style={[styles.optionText, selectedOption === 'Pix' && styles.selectedText]}>Pix</Text>
                                            <RadioButton.Android value="Pix" color={styles.radioButton.color} />
                                        </View>

                                        <View style={[styles.optionContainer, selectedOption === 'Cartão de Crédito' && styles.selectedOption]}>
                                            <FontAwesome name="credit-card" size={24} color={selectedOption === 'Cartão de Crédito' ? styles.radioButton.color : 'black'} />
                                            <Text style={[styles.optionText, selectedOption === 'Cartão de Crédito' && styles.selectedText]}>Cartão de Crédito</Text>
                                            <RadioButton.Android value="Cartão de Crédito" color={styles.radioButton.color} />
                                        </View>

                                        <View style={[styles.optionContainer, selectedOption === 'Boleto' && styles.selectedOption]}>
                                            <MaterialCommunityIcons name="barcode" size={24} color={selectedOption === 'Boleto' ? styles.radioButton.color : 'black'} />
                                            <Text style={[styles.optionText, selectedOption === 'Boleto' && styles.selectedText]}>Boleto</Text>
                                            <RadioButton.Android value="Boleto" color={styles.radioButton.color} />
                                        </View>
                                    </RadioButton.Group>
                                </View>

                            </Box>

                            <Box className='flex flex-col pb-3'>
                                <Text className='text-xl font-bold mt-2 pb-3 pt-3' style={{ fontWeight: 500 }}>
                                    Endereço de cobrança
                                </Text>
                                <View style={{ borderBottomColor: '#CACACA', borderBottomWidth: 1, marginBottom: 10 }}>
                                </View>
                                <Box className='flex flex-col pt-4 pb-3'>
                                    <Text className='text-xl font-bold mt-2' style={{ fontWeight: 400, fontSize: 16, color: '#494949', lineHeight: 16 }}>
                                        Deseja usar o endereço do cadastro como endereço da cobrança?
                                    </Text>
                                    <Text className='text-xl font-bold mt-2' style={{ fontWeight: 400, fontSize: 14, color: '#494949', lineHeight: 16 }}>
                                        Caso seja, será preenchido automaticamente.
                                    </Text>
                                </Box>

                                <View style={styles.containerAdress} >
                                    <RadioButton.Group
                                        onValueChange={(value) => setSelectedOptionAdress(value)}
                                        value={selectedOptionAdress}

                                    >
                                        <Box className='flex flex-row ' style={{justifyContent:'space-around'}}>
                                            <Box style={{ width: '50%', paddingRight:3 }}>
                                                <View style={[styles.optionContainerAdress, selectedOptionAdress === 'Sim' && styles.selectedOption]}>
                                                    <Text style={[styles.optionText, selectedOptionAdress === 'Sim' && styles.selectedText]}>Sim</Text>
                                                    <RadioButton.Android value="Sim" color={styles.radioButton.color} />
                                                </View>
                                            </Box>
                                            <Box style={{width: '50%', paddingLeft:3}}>
                                                <View style={[styles.optionContainerAdress, selectedOptionAdress === 'Não' && styles.selectedOption]}>
                                                    <Text style={[styles.optionText, selectedOptionAdress === 'Não' && styles.selectedText]}>Não</Text>
                                                    <RadioButton.Android value="Não" color={styles.radioButton.color} />
                                                </View>

                                            </Box>
                                        </Box>

                                    </RadioButton.Group>
                                </View>

                                <Box className='flex flex-col pt-4 pb-3'>
                                    <KeyboardAwareScrollView>
                                        <Box>
                                            <Controller
                                                control={control}
                                                name="estado"
                                                render={({ field: { value, onChange }, ...rest }) => (
                                                    <TextFieldInput
                                                        value={value}
                                                        label='Estado'
                                                        onChangeText={onChange}
                                                        placeholder="Estado"
                                                        placeholderTextColor="gray"
                                                        // error={formState.errors.estado?.message}
                                                        {...rest}
                                                    />
                                                )}
                                            />
                                            <Controller
                                                control={control}
                                                name="cidade"
                                                render={({ field: { value, onChange }, ...rest }) => (
                                                    <TextFieldInput
                                                        value={value}
                                                        label='Cidade'
                                                        onChangeText={onChange}
                                                        placeholder="Cidade"
                                                        placeholderTextColor="gray"
                                                        color={'red'}
                                                        //   error={formState.errors.cidade?.message}
                                                        {...rest}
                                                    />
                                                )}
                                            />
                                            <Controller
                                                control={control}
                                                name="bairro"
                                                render={({ field: { value, onChange }, ...rest }) => (
                                                    <TextFieldInput
                                                        value={value}
                                                        label='Bairro'
                                                        onChangeText={onChange}
                                                        placeholder="Bairro"
                                                        placeholderTextColor="gray"
                                                        //   error={formState.errors.bairro?.message}
                                                        {...rest}
                                                    />
                                                )}
                                            />
                                            <Controller
                                                control={control}
                                                name="endereco"
                                                render={({ field: { value, onChange }, ...rest }) => (
                                                    <TextFieldInput
                                                        value={value}
                                                        label='Endereço'
                                                        onChangeText={onChange}
                                                        placeholder="Nome da rua/avenida"
                                                        placeholderTextColor="gray"
                                                        //   error={formState.errors.endereco?.message}
                                                        {...rest}
                                                    />
                                                )}
                                            />
                                            <Controller
                                                control={control}
                                                name="complemento"
                                                render={({ field: { value, onChange }, ...rest }) => (
                                                    <TextFieldInput
                                                        value={value}
                                                        label='Nº e complemento'
                                                        onChangeText={onChange}
                                                        placeholder="Ex: 123, apartamento 2 conjunto 3"
                                                        placeholderTextColor="gray"
                                                        //   error={formState.errors.complemento?.message}
                                                        {...rest}
                                                    />
                                                )}
                                            />
                                            <Controller
                                                control={control}
                                                name="cep"
                                                render={({ field: { value, onChange }, ...rest }) => (
                                                    <TextFieldInput
                                                        value={value}
                                                        label='CEP'
                                                        onChangeText={onChange}
                                                        placeholder="00000-000"
                                                        placeholderTextColor="gray"
                                                        keyboardType='numeric'
                                                        //   error={formState.errors.cep?.message}
                                                        {...rest}
                                                    />
                                                )}
                                            />
                                        </Box>

                                        <Box className='pt-8 pb-8'>
                                            <Button
                                                title='Prosseguir com filiação'
                                                onPress={handleSubmit(onSubmit)}
                                                disabled={!formState.isValid}
                                            />
                                        </Box>
                                    </KeyboardAwareScrollView>
                                </Box>
                            </Box>


                        </Box>
                    </Box>
                </ScrollView>
            </Portal>
        </PaperProvider>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerAdress: {
        display: 'flex',
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: 'black', 

    },
    optionContainerAdress: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: 'black',
        marginBottom: 10, 

    },
    optionText: {
        fontSize: 18,
        color: 'black'        
    },
    selectedOption: {
        borderColor: '#083061',

    },
    selectedText: {
        color: '#083061',
    },
    radioButton: {
        color: '#083061',
    },
    radioColor: {
        color: 'black'
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    switch: {
        transform: [{ scaleX: 0.8 }, { scaleY: 0.7 }], 
        marginRight: 5, 
    },
    switchText: {
        color: '#494949',
        fontSize: 14,
    },
});


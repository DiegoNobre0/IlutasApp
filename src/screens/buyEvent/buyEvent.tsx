import { useEffect, useState } from 'react'
import { EventInformation, Evento } from 'src/domain-types'
import { mockEvento } from './mock'
import { Accordion, Box, Image, ScrollView, Text, View } from "native-base";
import { Icon, IconButton, PaperProvider, Portal } from 'react-native-paper';
import { Button, FeedbackCard, Field, HeaderHome, LinkCard, ModalFull, ModalScreen } from 'src/components';
import { Share, TouchableOpacity } from 'react-native';
import { useModal } from 'src/core';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';




import { Linking } from 'react-native';
import dayjs from 'dayjs';

const shareWhatsApp = (text: string) => {
    Linking.openURL(`whatsapp://send?text=${text} + \n + ${text}`);
}


export const BuyEventPage = (navigation: {
    route: {
        params: {
            id?: string
        }
    },
    goBack: () => void
}) => {

    const [event, setEvent] = useState<Evento | undefined>()

    const fetchEvent = async (id: string) => {
        // const response = await fetch(`https://api.example.com/events/${id}`)
        // const data = await response.json()
        // return data
        const data = mockEvento
        setEvent(data)

    }

    const [fullPriceCount, setFullPriceCount] = useState(0);
    const [halfPriceCount, setHalfPriceCount] = useState(0);
    const [id, setId] = useState<any>("");

    const incrementFullPrice = () => {
        setFullPriceCount(fullPriceCount + 1);
    };

    const decrementFullPrice = () => {
        if (fullPriceCount > 0) {
            setFullPriceCount(fullPriceCount - 1);
        }
    };

    const incrementHalfPrice = () => {
        setHalfPriceCount(halfPriceCount + 1);
    };

    const decrementHalfPrice = () => {
        if (halfPriceCount > 0) {
            setHalfPriceCount(halfPriceCount - 1);
        }
    };

    const totalPrice = (fullPriceCount * 30) + (halfPriceCount * 15);
    const totalPriceString = totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    useEffect(() => {
        const id = navigation?.route.params.id

        setId(id)

        console.log(id)
        if (!id) return

        fetchEvent(id)
    }, [navigation?.route.params.id])

    const [isModalListagemOpen, openModalListage, closeModalListagem] = useModal()
    const [isResultadosModalOpen, openResultadosModal, closeResultadosModal] = useModal()

    const navigate = useNavigation()

    return (
        <PaperProvider>
            <Portal>
                <ScrollView
                    className='w-full h-full py-4'>
                    <Box className="h-full w-full flex flex-col mt-4 px-6 pb-4">
                        <View
                            className='flex flex-row justify-start gap-0 items-center w-full pb-5'
                        >
                            <TouchableOpacity
                                onPress={() => navigate.goBack()}
                                className='flex items-center justify-center rounded-full w-6 h-10'
                            >
                                <Icon
                                    source='chevron-left'
                                    size={24}
                                    color='#000'
                                />
                            </TouchableOpacity>
                            <Text className="text-base font-medium text-start"
                                style={{ fontSize: 19 }}>
                                Compra de ingresso
                            </Text>
                        </View>

                        <Box
                            style={{ backgroundColor: "#E8ECFA", padding: 8 }}
                        >
                            <Box
                                className='flex w-full flex-col pt-4'
                                style={{ backgroundColor: "white", borderRadius: 10 }}
                            >
                                <Box
                                    style={{ alignItems: 'center' }}>
                                    <Image
                                        source={{ uri: event?.urlImagem }}
                                        alt={event?.name}
                                        style={{ width: '95%', height: 200, borderRadius: 10, marginBottom: 10 }}
                                        resizeMode="stretch"
                                    />
                                </Box>
                                <Text
                                    className='text-xl font-bold mt-2 ml-2 pb-2'
                                    style={{ fontWeight: 500, fontSize: 24 }}
                                >
                                    {event?.name}
                                </Text>
                                <Box className='flex flex-row items-center ml-2 pb-2'>
                                    <Feather name="calendar" size={20} color="black" />
                                    <Text
                                        className='text-xl font-bold mt-2 pl-3'
                                        style={{ fontWeight: 400, fontSize: 16, color: '#494949', lineHeight: 16 }}>
                                        {event?.values.date ?? ''}
                                    </Text>
                                </Box>


                            </Box>

                            <Box
                                className='flex flex-col pb-3'>
                                <Text
                                    className='text-xl font-bold mt-2 pb-5 pt-3'
                                    style={{ fontWeight: 500 }}>
                                    Ingressos
                                </Text>
                                <Box
                                    className='flex flex-row'
                                    style={{ backgroundColor: "white", borderRadius: 10 }}>
                                    <Box
                                        className='flex flex-col pt-4 pb-5 pl-6'

                                    >
                                        <Text
                                            className='text-xl font-bold mt-2'
                                            style={{ fontSize: 12, color: '#083061', lineHeight: 16 }}>
                                            Meia (PRIMEIRO LOTE)
                                        </Text>
                                        <Text
                                            className='text-xl font-bold mt-2'
                                            style={{ fontWeight: 400, fontSize: 12, color: '#494949', lineHeight: 16 }}>
                                            R$30,00
                                        </Text>
                                        <Text
                                            className='text-xl font-bold mt-2'
                                            style={{ fontWeight: 400, fontSize: 12, color: '#494949', lineHeight: 16 }}>
                                            Encerra em 00/00 às 00:00
                                        </Text>
                                        <Text
                                            className='text-xl font-bold mt-2'
                                            style={{ fontWeight: 400, fontSize: 12, color: '#494949', lineHeight: 16 }}>
                                            Descrição sobre o lote
                                        </Text>
                                    </Box>
                                    <Box className='flex flex-col pt-10 pb-5 pl-6 mr-10'>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableOpacity onPress={decrementFullPrice} >
                                                <View style={{ backgroundColor: '#EAEFF4', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                    <AntDesign name="minus" size={25} color="#083061" />
                                                </View>
                                            </TouchableOpacity>
                                            <Text style={{ fontSize: 16, marginHorizontal: 10 }}>{fullPriceCount}</Text>
                                            <TouchableOpacity onPress={incrementFullPrice} >
                                                <View style={{ backgroundColor: '#EAEFF4', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                    <AntDesign name="plus" size={25} color="#083061" />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                className='flex flex-row'
                                style={{ backgroundColor: "white", borderRadius: 10 }}>
                                <Box
                                    className='flex flex-col pt-4 pb-5 pl-6'

                                >
                                    <Text
                                        className='text-xl font-bold mt-2'
                                        style={{ fontSize: 12, color: '#083061', lineHeight: 16 }}>
                                        Meia (PRIMEIRO LOTE)
                                    </Text>
                                    <Text
                                        className='text-xl font-bold mt-2'
                                        style={{ fontWeight: 400, fontSize: 12, color: '#494949', lineHeight: 16 }}>
                                        R$30,00
                                    </Text>
                                    <Text
                                        className='text-xl font-bold mt-2'
                                        style={{ fontWeight: 400, fontSize: 12, color: '#494949', lineHeight: 16 }}>
                                        Encerra em 00/00 às 00:00
                                    </Text>
                                    <Text
                                        className='text-xl font-bold mt-2'
                                        style={{ fontWeight: 400, fontSize: 12, color: '#494949', lineHeight: 16 }}>
                                        Descrição sobre o lote
                                    </Text>
                                </Box>
                                <Box className='flex flex-col pt-10 pb-5 pl-6 mr-10'>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={decrementHalfPrice} >
                                            <View style={{ backgroundColor: '#EAEFF4', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                <AntDesign name="minus" size={25} color="#083061" />
                                            </View>
                                        </TouchableOpacity>
                                        <Text style={{ fontSize: 16, marginHorizontal: 10 }}>{halfPriceCount}</Text>
                                        <TouchableOpacity onPress={incrementHalfPrice} >
                                            <View style={{ backgroundColor: '#EAEFF4', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                <AntDesign name="plus" size={25} color="#083061" />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </Box>
                            </Box>

                            {(fullPriceCount > 0 || halfPriceCount > 0) && (
                                <Box className='flex flex-col pt-4'>
                                    <Box
                                        className='flex w-full  pt-4 pb-5 pl-3 pl-6'
                                        style={{ backgroundColor: "white", borderRadius: 10 }}
                                    >
                                        <Box className="flex flex-row justify-between">
                                            <Text
                                                className='text-xl font-bold mt-2'
                                                style={{ fontWeight: 500, fontSize: 18, lineHeight: 19 }}>
                                                Valor total:
                                            </Text>
                                            <Text
                                                className='text-xl font-bold mt-2 pr-4'
                                                style={{ fontWeight: 500, fontSize: 16, lineHeight: 19, color: '#27BD69' }}>
                                                R${totalPrice}
                                            </Text>
                                        </Box>
                                    </Box>
                                </Box>)}

                            <Box
                                className='flex flex-col'>
                                <Text
                                    className='text-xl font-bold mt-2 pb-5 pt-3'
                                    style={{ fontWeight: 500 }}>
                                    Descrição
                                </Text>
                                <Box
                                    className='flex w-full flex-col pt-4 pb-5 pl-3 pl-3'
                                    style={{ backgroundColor: "white", borderRadius: 10 }}
                                >
                                    <Text
                                        className='text-xl font-bold'
                                        style={{ fontWeight: 400, fontSize: 12, color: '#494949', lineHeight: 16 }}>
                                        Lorem ipsum consectetur massa dictumst primis suspendisse risus, orci elit varius volutpat mi vestibulum metus vestibulum,
                                        dolor maecenas etiam at lobortis senectus. donec nullam curabitur etiam eros sollicitudin convallis viverra aliquet, tempus
                                        dictumst platea a velit suscipit risus, suscipit purus aliquet fusce cubilia vivamus cras. aliquam quis pharetra pulvinar nec
                                        tempus fermentum varius scelerisque, aliquet hendrerit duis tempor luctus habitasse class id, sociosqu molestie risus elit sociosqu
                                        tempus donec. torquent lorem suscipit mauris hendrerit sodales ultricies sociosqu quisque, ut potenti curabitur augue curabitur per
                                        suspendisse, maecenas curae suscipit ultricies pulvinar fames maecenas.
                                    </Text>
                                </Box>
                            </Box>

                            <Box
                                className='flex flex-col'>
                                <Text
                                    className='text-xl font-bold mt-2 pb-3 pt-3'
                                    style={{ fontWeight: 500 }}>
                                    Local
                                </Text>
                                <Box
                                    className='flex w-full flex-row pt-4 pb-5 pl-3 pl-3 items-center'
                                    style={{ backgroundColor: "white", borderRadius: 10 }}
                                >
                                    <Box>
                                        <View style={{ backgroundColor: '#EAEFF4', borderRadius: 15, width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}>
                                            <Ionicons name="location-outline" size={25} color="#083061" />
                                        </View>
                                    </Box>
                                    <Box className='flex w-full flex-col pl-2'>
                                        <Text
                                            className='text-xl font-bold mt-2'
                                            style={{ fontSize: 17, color: '#083061', lineHeight: 16 }}>
                                            Ginásio Rio de Janeiro
                                        </Text>
                                        <Text
                                            className='text-xl font-bold mt-2'
                                            style={{ fontWeight: 400, fontSize: 12, color: '#494949', lineHeight: 16 }}>
                                            Rua despostista Jeremias, 123
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                className='flex flex-col'>
                                <Text
                                    className='text-xl font-bold mt-2 pb-3 pt-3 '
                                    style={{ fontWeight: 500 }}>
                                    Mais
                                </Text>
                                <Box
                                    className='flex w-full flex-row pt-4 pb-5 pl-3 pl-3 justify-center'
                                    style={{ backgroundColor: "white", borderRadius: 10 }}
                                >
                                    <Entypo name="instagram" size={30} color="#083061" style={{ marginRight: 10 }} />
                                    <Entypo name="share" size={30} color="#083061" style={{ marginHorizontal: 10 }} />
                                    <FontAwesome name="whatsapp" size={30} color="#083061" style={{ marginLeft: 10 }} />
                                </Box>
                            </Box>
                        </Box>

                        <Box className='pt-8 pb-8'>
                            <Button
                                title='Próximo'
                                onPress={() => {
                                    (navigate.navigate as any)('PaymentEvent', { id: id });
                                }}
                            />
                        </Box>
                    </Box>
                </ScrollView>
            </Portal>
        </PaperProvider>
    )
}
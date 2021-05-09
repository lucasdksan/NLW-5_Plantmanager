import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import DateTimerPiker, { Event } from '@react-native-community/datetimepicker';
import waterImage from '../assets/waterdrop.png';
import { SvgFromUri } from 'react-native-svg';
import Button from '../components/Button';
import colors from '../styles/colors';
import { useNavigation, useRoute } from '@react-navigation/core';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import fonts from '../styles/fonts';
import { format, isBefore } from 'date-fns';
import { PlantProps, PlantSaves } from '../libs/storage';

interface Params{
    plant: PlantProps;
}

const PlantSave = ()=>{
    const route = useRoute();
    const navigation = useNavigation();
    const { plant } = route.params as Params;
    const [ selectedDateTimer, setSelectedDateTimer ] = useState(new Date());
    const [ showDatePiker, setShowDatePiker ] = useState(Platform.OS === 'ios');

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS === 'android'){
            setShowDatePiker(oldState => !oldState);
        }
        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTimer(new Date());
            return Alert.alert('Escolha outro horário. Você não quer matar sua planta...');
        }
        if(dateTime){
            setSelectedDateTimer(dateTime)
        }
    }
    function handleOpenDateTimerPikerForAndroid(){
        setShowDatePiker(oldState => !oldState);
    }
    async function handleSave(){
        try{
            await PlantSaves({
                ...plant,
                dateTimeNotification: selectedDateTimer
            });
            navigation.navigate('Confirmation', {
                title: 'Tudo Certo',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar da suas plantinhas com muito cuidado.',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlant'
            });
        } catch{
            return Alert.alert('Não foi possível salvar.');
        }
    }

    return(
        <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            <View style={styles.container}>
                <View style={styles.plantInfo}>
                    <SvgFromUri
                        uri={plant.photo}
                        height={150}
                        width={150}
                    />
                    <Text style={styles.plantName}>{plant.name}</Text>
                    <Text style={styles.plantAbout}>{plant.about}</Text>
                </View>
                <View style={styles.controller}>
                    <View style={styles.tipContainer}>
                        <Image
                            source={waterImage}
                            style={styles.tipImage}
                        />
                        <Text style={styles.tipText}>
                            {plant.water_tips}
                        </Text>
                    </View>
                    <Text style={styles.alertLabel}>
                        Escolha o melhor horário para ser lembrando
                    </Text>
                    {showDatePiker && (<DateTimerPiker
                        value={selectedDateTimer}
                        mode="time"
                        display="spinner"
                        onChange={handleChangeTime}
                    />)}
                    {
                        Platform.OS === 'android' && (
                            <TouchableOpacity 
                                onPress={handleOpenDateTimerPikerForAndroid}
                            >
                                <Text style={styles.dateTimePikerText}>
                                {`Mudar ${format(selectedDateTimer, 'HH:mm')}`}
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                    <Button
                        title="Cadastrar planta"
                        onPress={handleSave}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape,
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.heading,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10,
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60,
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        textAlign: 'justify',
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5,
    },
    dateTimePikerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text,
    },
    dateTimerPikerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40
    }
});

export default PlantSave;
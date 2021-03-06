import React from 'react';
import { SafeAreaView, 
         Text, 
         Image, 
         TouchableOpacity, 
         StyleSheet, 
         Dimensions,
         View } from 'react-native';
import fonts from '../styles/fonts';
import { Feather } from '@expo/vector-icons';
import colors from '../styles/colors';
import watering from '../assets/watering.png';
import { useNavigation } from '@react-navigation/core';

const Welcome = ()=>{
    const navigation = useNavigation();
    function handleStart(){
        navigation.navigate('UserIdetification');
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {'\n'}
                    suas plantas {'\n'}
                    de forma fácil
                </Text>
                <Image 
                    source={watering} 
                    style={styles.image}
                    resizeMode='contain'
                />
                <Text style={styles.subTitle}>
                    Não esqueça mais de regar suas plantas.
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>
                <TouchableOpacity 
                    style={styles.button} 
                    activeOpacity={0.7}
                    onPress={handleStart}
                >
                    <Feather 
                        name='chevron-right'
                        style={styles.buttonIcon}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around', 
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 34,
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    button:{ 
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,
    },
    image: {
        height: Dimensions.get('window').width*0.7,
    },
    buttonIcon: {
        color: colors.white,
        fontSize: 32,
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    }
});

export default Welcome;
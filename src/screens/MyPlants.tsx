import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList,
    Alert
} from 'react-native';
import waterdrop from '../assets/waterdrop.png';
import Header from '../components/Header';
import Load from '../components/Load';
import PlantCardSecondary from '../components/PlantCardSecondary';
import { PlantProps, loadPlant, StoragePlantProps, removePlant } from '../libs/storage';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

const MyPlants = ()=>{
    const [ myPlants, setMyPlants ] = useState<PlantProps[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ nextWatered, setNextWatered ] = useState<string>();

    function handleRemove(plant: PlantProps){
        Alert.alert('Remover', `Deseja remover ${plant.name}?`, [
            {
                text: 'Não 🙏',
                style: 'cancel',
            },
            {
                text: 'Sim 💔',
                onPress: async ()=> {
                    try{
                        await removePlant(plant.id);
                        setMyPlants((oldData)=>(
                            oldData.filter((item)=> item.id !== plant.id)
                        ))
                    } catch(err){
                        Alert.alert('Não foi possível remover!');
                    }
                }
            }
        ]);
    }

    useEffect(()=>{
        async function loadStorageData(){
            const plantsStoraged = await loadPlant();
            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {
                    locale: pt
                }
            );
            setNextWatered(
                `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}.`
            );
            setMyPlants(plantsStoraged);
            setLoading(false);
        }
        loadStorageData();
    },[]);

    if(loading){
        return <Load/>;
    }

    return(
        <View style={styles.container}>
            <Header/>
            <View style={styles.spotLight}>
                <Image
                    source={waterdrop}
                    style={styles.spotLightImage}
                />
                <Text style={styles.spotLightText}>{nextWatered}</Text>
            </View>
            <View style={styles.plants}>
                <Text style={styles.plantTitle}></Text>
                <FlatList
                    data={myPlants}
                    keyExtractor={(key)=> String(key.id)}
                    renderItem={({item}) => (
                        <PlantCardSecondary
                            data={item}
                            handleRemove={() => handleRemove(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flex:1}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background, 
    },
    spotLight:{
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    spotLightImage: {
        width: 60,
        height: 60,
    },
    spotLightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%',
    },
    plantTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20,
    }
});

export default MyPlants;
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import colors from '../styles/colors';
import Welcome from '../screens/Welcome';
import UserIdetification from '../screens/UserIdentification';
import Confirmation from '../screens/Confirmation';
import PlantSave from '../screens/PlantSave';
import AuthRoutes from './tab.routes';

const StakRoutes = createStackNavigator();
const AppRoutes:React.FC = ()=>{
    return(
        <StakRoutes.Navigator
            headerMode='none'
            screenOptions={{
                cardStyle: {
                    backgroundColor: colors.white,
                }
            }}
        >
            <StakRoutes.Screen
                name="Welcome"
                component={Welcome}
            />
            <StakRoutes.Screen
                name="UserIdetification"
                component={UserIdetification}
            />
            <StakRoutes.Screen
                name="Confirmation"
                component={Confirmation}
            />
            <StakRoutes.Screen
                name="PlantSelect"
                component={AuthRoutes}
            />
            <StakRoutes.Screen
                name="PlantSave"
                component={PlantSave}
            />
            <StakRoutes.Screen
                name="MyPlant"
                component={AuthRoutes}
            />
        </StakRoutes.Navigator>
    );
}

export default AppRoutes;
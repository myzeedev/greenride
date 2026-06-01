import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/splash-screen/SplashScreen';
import WalkThrough from './screens/walkthrough/WalkThrough';
import Login from './screens/login-screen/LoginScreen';
import Landing from './screens/landing/Landing';

export type RootStackParamList = {
    SplashScreen: undefined;
    WalkThrough: undefined;
    Login: undefined;
    Landing: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function PageNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="SplashScreen"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                />

                <Stack.Screen
                    name="WalkThrough"
                    component={WalkThrough}
                />

                <Stack.Screen
                    name="Login"
                    component={Login}
                />

                <Stack.Screen
                    name="Landing"
                    component={Landing}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
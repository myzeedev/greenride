import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../PageNavigator';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'SplashScreen'
>;

export default function SplashScreen({ navigation }: Props) {

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('WalkThrough');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View>
            <Text>Loading</Text>
        </View>
    );
}
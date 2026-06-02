import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
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
        <View style={styles.container}>
            <Image
                source={require('../../../assets/gr-png.png')}
                style={styles.logo}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Vertical center
        alignItems: 'center',     // Horizontal center
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
});
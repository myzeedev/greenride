import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function MapScreen() {

    const [location, setLocation] =
        useState<Location.LocationObjectCoords | null>(null);

    useEffect(() => {
        (async () => {
            const { status } =
                await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') return;

            const current =
                await Location.getCurrentPositionAsync({});

            setLocation(current.coords);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 6.5244,
                    longitude: 3.3792,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: 6.5244,
                        longitude: 3.3792,
                    }}
                    title="Lagos"
                    description="Marker location"
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});
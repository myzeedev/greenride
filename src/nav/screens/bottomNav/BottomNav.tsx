import React, { useMemo, useRef } from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

export default function BottomNav() {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);

    return (

            <BottomSheetView style={styles.sheetContent}>
                <Text style={styles.title}>Where to?</Text>

                <View style={styles.pickupContainer}>
                    <Text>📍 Current Location: Wuse 2, Abuja</Text>
                </View>

                <TextInput
                    placeholder="Enter destination"
                    placeholderTextColor="#444"
                    style={styles.input}
                    editable={false}
                />

        </BottomSheetView>
    );
}
const styles = StyleSheet.create({
    sheetContent: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff'
    },
    pickupContainer: {
        padding: 15,
        borderRadius: 12,
        backgroundColor: '#f3f3f3',
        marginBottom: 12,
    },
    input: {
        height: 55,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        paddingHorizontal: 15,
        fontWeight: 'bold',
        fontSize: 15
    },
});
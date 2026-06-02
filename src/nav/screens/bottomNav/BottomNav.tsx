import React, { useMemo, useRef } from 'react';
import { View, Button, Text } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

export default function BottomNav() {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['25%', '50%', '80%'], []);

    return (
        <View style={{ flex: 1 }}>
            <Button
                title="Open Bottom Sheet"
                onPress={() => bottomSheetRef.current?.expand()}
            />

            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose
            >
                <View style={{ padding: 20 }}>
                    <Text>Welcome to GreenRide</Text>
                    <Text>Select your pickup location.</Text>
                </View>
            </BottomSheet>
        </View>
    );
}
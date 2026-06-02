import React, { useRef, useCallback } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';
import MapScreen from '../../../map/MapScreen';
import BottomNav from '../bottomNav/BottomNav';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const SNAP_POINTS = ['25%', '50%', '90%'];

// const MAP_HEIGHT_FULL = SCREEN_HEIGHT;

export function Landing() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const animatedPosition = useSharedValue(0);

    const animatedMapStyle = useAnimatedStyle(() => {
        const mapHeight = interpolate(
            animatedPosition.value,
            [
                SCREEN_HEIGHT,
                SCREEN_HEIGHT * 0.5,
                SCREEN_HEIGHT * 0.1,
            ],
            [
                SCREEN_HEIGHT * 0.75,
                SCREEN_HEIGHT * 0.5,
                SCREEN_HEIGHT * 0.1,
            ],
            Extrapolation.CLAMP
        );

        return { height: mapHeight };
    });

    const handleAnimate = useCallback((fromIndex: number, toIndex: number) => {

    }, []);

    return (
        <View style={styles.container}>

            <Animated.View style={[styles.mapContainer, animatedMapStyle]}>
                <MapScreen />
            </Animated.View>

            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={SNAP_POINTS}
                animatedPosition={animatedPosition}
                onAnimate={handleAnimate}
                backgroundStyle={styles.sheetBackground}
                handleIndicatorStyle={styles.handleIndicator}
                enablePanDownToClose={false}
            >
                <BottomSheetView style={styles.sheetContent}>
                    <BottomNav />
                </BottomSheetView>
            </BottomSheet>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a1a0f',
    },
    mapContainer: {
        width: '100%',
        height: 400,
        overflow: 'hidden',
    },
    sheetBackground: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    handleIndicator: {
        backgroundColor: '#4ecb6a',
        width: 40,
    },
    sheetContent: {
        flex: 1,
        paddingHorizontal: 16,
    },
});

export default Landing;
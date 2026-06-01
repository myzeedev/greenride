import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar, Image,
} from 'react-native';

import {useNavigation} from "expo-router";
import {NativeStackNavigationProp} from "react-native-screens/native-stack";
import {RootStackParamList} from "../../PageNavigator";

const { width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const navigation = useNavigation<NavigationProp>();

export default function LoginScreen() {

    // const navigation = useNavigation();

    const [step, setStep] = useState<'email' | 'password'>('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const emailAnim = useRef(new Animated.Value(0)).current;
    const passwordAnim = useRef(new Animated.Value(width)).current;
    const dot1Width = useRef(new Animated.Value(32)).current;
    const dot2Width = useRef(new Animated.Value(20)).current;

    const passwordRef = useRef<TextInput>(null);

    const goToPassword = () => {
        if (!email.trim()) return;

        Animated.parallel([
            Animated.timing(emailAnim, {
                toValue: -width,
                duration: 320,
                useNativeDriver: true,
            }),
            Animated.timing(passwordAnim, {
                toValue: 0,
                duration: 320,
                useNativeDriver: true,
            }),
            Animated.timing(dot1Width, {
                toValue: 20,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(dot2Width, {
                toValue: 32,
                duration: 300,
                useNativeDriver: false,
            }),
        ]).start(() => {
            setStep('password');
            passwordRef.current?.focus();
        });
    };

    const goBack = () => {
        Animated.parallel([
            Animated.timing(emailAnim, {
                toValue: 0,
                duration: 320,
                useNativeDriver: true,
            }),
            Animated.timing(passwordAnim, {
                toValue: width,
                duration: 320,
                useNativeDriver: true,
            }),
            Animated.timing(dot1Width, {
                toValue: 32,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(dot2Width, {
                toValue: 20,
                duration: 300,
                useNativeDriver: false,
            }),
        ]).start(() => setStep('email'));
    };

    const handleLogin = () => {
        if (!password.trim()) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
            navigation.navigate('Landing')
        }, 2000);
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <StatusBar barStyle="light-content" backgroundColor="#0a1a0f" />
            <ScrollView
                contentContainerStyle={styles.scroll}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.leaf1} />
                <View style={styles.leaf2} />
                <View style={styles.leaf3} />

                <View style={styles.logoRow}>
                    <View style={styles.logoIcon}>
                        <Text style={styles.logoEmoji}></Text>
                        <Image
                            src={require('../../../assets/green-ride.png')}
                            style={{height: 50, width: 50}}
                        />
                    </View>
                    <Text style={styles.logoText}>GreenRide</Text>
                </View>

                <View style={styles.ecoBadge}>
                    <View style={styles.ecoDot} />
                    <Text style={styles.ecoBadgeText}>Carbon-neutral rides</Text>
                </View>

                <Text style={styles.headline}>
                    Welcome{'\n'}back,{' '}
                    <Text style={styles.headlineAccent}>rider.</Text>
                </Text>

                <View style={styles.dotsRow}>
                    <Animated.View style={[styles.dot, { width: dot1Width, backgroundColor: step === 'email' ? '#4ecb6a' : '#1a3a1f' }]} />
                    <Animated.View style={[styles.dot, { width: dot2Width, backgroundColor: step === 'password' ? '#4ecb6a' : '#1a3a1f' }]} />
                </View>

                <View style={styles.stepsContainer}>

                    <Animated.View
                        style={[styles.stepWrap, { transform: [{ translateX: emailAnim }] }]}
                        pointerEvents={step === 'email' ? 'auto' : 'none'}
                    >
                        <Text style={styles.label}>Email address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="you@example.com"
                            placeholderTextColor="#2a4a2f"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={email}
                            onChangeText={setEmail}
                            onSubmitEditing={goToPassword}
                            returnKeyType="next"
                        />

                        <TouchableOpacity style={styles.btn} onPress={goToPassword} activeOpacity={0.85}>
                            <Text style={styles.btnText}>Continue →</Text>
                        </TouchableOpacity>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>or</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity style={styles.btnGhost} activeOpacity={0.85}>
                            <Text style={styles.btnGhostText}>Continue with Google</Text>
                        </TouchableOpacity>

                        <Text style={styles.signupRow}>
                            New here?{' '}
                            <Text style={styles.signupLink}>Create an account</Text>
                        </Text>
                    </Animated.View>

                    <Animated.View
                        style={[styles.stepWrap, styles.stepAbsolute, { transform: [{ translateX: passwordAnim }] }]}
                        pointerEvents={step === 'password' ? 'auto' : 'none'}
                    >
                        <TouchableOpacity style={styles.backBtn} onPress={goBack} activeOpacity={0.7}>
                            <Text style={styles.backArrow}>←</Text>
                            <Text style={styles.backText}>Back</Text>
                        </TouchableOpacity>

                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={[styles.input, styles.inputReadonly]}
                            value={email}
                            editable={false}
                        />

                        <Text style={[styles.label, { marginTop: 16 }]}>Password</Text>
                        <TextInput
                            ref={passwordRef}
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor="#2a4a2f"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            onSubmitEditing={handleLogin}
                            returnKeyType="done"
                        />

                        <TouchableOpacity style={styles.forgotBtn} activeOpacity={0.7}>
                            <Text style={styles.forgotText}>Forgot password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.btn, loading && styles.btnLoading]}
                            onPress={handleLogin}
                            activeOpacity={0.85}
                            disabled={loading}
                        >
                            <Text style={styles.btnText}>
                                {loading ? 'Signing in...' : 'Sign in'}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.signupRow}>
                            New here?{' '}
                            <Text style={styles.signupLink}>Create an account</Text>
                        </Text>
                    </Animated.View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a1a0f',
    },
    scroll: {
        flexGrow: 1,
        paddingHorizontal: 28,
        paddingTop: 64,
        paddingBottom: 40,
    },
    leaf1: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#2d7a3a',
        opacity: 0.07,
        top: -50,
        right: -60,
        transform: [{ rotate: '20deg' }],
    },
    leaf2: {
        position: 'absolute',
        width: 240,
        height: 240,
        borderRadius: 120,
        backgroundColor: '#1a5c28',
        opacity: 0.07,
        bottom: 60,
        left: -80,
        transform: [{ rotate: '-30deg' }],
    },
    leaf3: {
        position: 'absolute',
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: '#3a9a4a',
        opacity: 0.06,
        top: '45%',
        left: -50,
        transform: [{ rotate: '45deg' }],
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 28,
    },
    logoIcon: {
        width: 38,
        height: 38,
        backgroundColor: '#2d7a3a',
        borderRadius: 11,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoEmoji: {
        fontSize: 18,
    },
    logoText: {
        fontSize: 22,
        color: '#e8f5e0',
        fontWeight: '600',
        letterSpacing: -0.3,
    },
    ecoBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        backgroundColor: '#0f2515',
        borderWidth: 1,
        borderColor: '#1a3a1f',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        alignSelf: 'flex-start',
        marginBottom: 24,
    },
    ecoDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#4ecb6a',
    },
    ecoBadgeText: {
        fontSize: 11,
        color: '#4a8a55',
        letterSpacing: 0.5,
    },
    headline: {
        fontSize: 32,
        color: '#e8f5e0',
        fontWeight: '300',
        lineHeight: 40,
        marginBottom: 28,
        letterSpacing: -0.5,
    },
    headlineAccent: {
        color: '#4ecb6a',
        fontStyle: 'italic',
        fontWeight: '400',
    },
    dotsRow: {
        flexDirection: 'row',
        gap: 6,
        marginBottom: 28,
    },
    dot: {
        height: 4,
        borderRadius: 2,
    },
    stepsContainer: {
        position: 'relative',
        overflow: 'hidden',
    },
    stepWrap: {
        width: '100%',
    },
    stepAbsolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    label: {
        fontSize: 11,
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: '#4a8a55',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#0f2515',
        borderWidth: 1,
        borderColor: '#1a3a1f',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 15,
        color: '#e8f5e0',
        marginBottom: 4,
    },
    inputReadonly: {
        opacity: 0.5,
    },
    btn: {
        backgroundColor: '#4ecb6a',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 50
    },
    btnLoading: {
        backgroundColor: '#2d7a3a',
    },
    btnText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#0a1a0f',
        letterSpacing: 0.3,
    },
    btnGhost: {
        borderWidth: 1,
        borderColor: '#1a3a1f',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 8,
    },
    btnGhostText: {
        fontSize: 14,
        color: '#4a8a55',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginVertical: 16,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#1a3a1f',
    },
    dividerText: {
        fontSize: 12,
        color: '#2a4a2f',
    },
    forgotBtn: {
        alignSelf: 'flex-end',
        marginTop: 8,
        marginBottom: 4,
    },
    forgotText: {
        fontSize: 13,
        color: '#4a8a55',
    },
    backBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    backArrow: {
        fontSize: 16,
        color: '#4a8a55',
    },
    backText: {
        fontSize: 13,
        color: '#4a8a55',
    },
    signupRow: {
        fontSize: 13,
        color: '#4a8a55',
        textAlign: 'center',
        marginTop: 20,
    },
    signupLink: {
        color: '#4ecb6a',
    },
});
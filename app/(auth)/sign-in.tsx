// src/screens/SignIn.tsx (ou onde você estiver usando)
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SocialButton } from '@/components/auth/SocialButton';
import React, { useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <AuthLayout>
            {/* Top Section: Logo & Welcome */}
            <AuthHeader
                appName="WanderWe"
                tagline="Descubra sua próxima aventura."
            />

            {/* Form Section */}
            <View style={styles.formContainer}>
                {/* Email Input */}
                <View style={styles.inputGroup}>
                    <AuthInput
                        label="ENDEREÇO DE EMAIL"
                        iconName="mail-outline"
                        placeholder="ola@wanderwe.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                    <AuthInput
                        label="SENHA"
                        iconName="lock-closed-outline"
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        isPassword
                        autoCapitalize="none"
                        autoCorrect={false}
                    />

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                    </TouchableOpacity>
                </View>

                {/* Sign In Button */}
                <TouchableOpacity
                    style={styles.signInButton}
                    activeOpacity={0.8}
                >
                    <Text style={styles.signInButtonText}>Entrar</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Section: Social & Sign Up */}
            <View style={styles.bottomSection}>
                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>Ou continue com</Text>
                    <View style={styles.divider} />
                </View>

                <View style={styles.socialButtons}>
                    <SocialButton
                        provider="google"
                        label="Google"
                        onPress={() => { }}
                    />

                    <SocialButton
                        provider="apple"
                        label="Apple"
                        onPress={() => { }}
                    />
                </View>

                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Não tem uma conta? </Text>
                    <TouchableOpacity>
                        <Text style={styles.signUpLink}>Cadastre-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </AuthLayout>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 32,
        width: '100%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: 8,
    },
    forgotPasswordText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#FF6B6B',
    },
    signInButton: {
        backgroundColor: '#FF6B6B',
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        shadowColor: '#FF6B6B',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    signInButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    bottomSection: {
        marginTop: 32,
        width: '100%',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#e2e8f0',
    },
    dividerText: {
        fontSize: 12,
        color: '#94a3b8',
        fontWeight: '500',
        marginHorizontal: 16,
    },
    socialButtons: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 8,
    },
    signUpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
    },
    signUpText: {
        fontSize: 14,
        color: '#64748b',
    },
    signUpLink: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#FF6B6B',
    },
});

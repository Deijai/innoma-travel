// src/screens/RecoveryPassword.tsx
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthLayout } from '@/components/auth/AuthLayout';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


export default function RecoveryPassword() {
    const [email, setEmail] = useState('');

    // const handleRecovery = () => { ... }

    return (
        <AuthLayout>
            {/* Top Section */}
            <AuthHeader
                appName="Recuperar senha"
                tagline="Digite o email cadastrado para enviarmos um link de recuperação."
                iconName="key-outline"
            />

            {/* Form Section */}
            <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                    <AuthInput
                        label="ENDEREÇO DE EMAIL"
                        iconName="mail-outline"
                        placeholder="ola@wanderwe.com"
                        placeholderTextColor="#94a3b8"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                <Text style={styles.helperText}>
                    Enviaremos um link para você criar uma nova senha. Lembre-se de
                    conferir também a caixa de spam.
                </Text>

                <TouchableOpacity
                    style={[styles.signInButton, { marginTop: 24 }]}
                    activeOpacity={0.8}
                // onPress={handleRecovery}
                >
                    <Text style={styles.signInButtonText}>Enviar link</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                <View className="signUpContainer" style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Lembrou da senha? </Text>
                    <TouchableOpacity>
                        <Text style={styles.signUpLink}>Voltar ao login</Text>
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
    helperText: {
        fontSize: 13,
        color: '#64748b',
        marginTop: 4,
        marginLeft: 4,
        lineHeight: 18,
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

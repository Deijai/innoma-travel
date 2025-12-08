// src/screens/SignUp.tsx
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { SocialButton } from '@/components/auth/SocialButton';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SignUp() {
    const router = useRouter();
    const { signUp, isLoading } = useAuthStore();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function handleSignUp() {
        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            Alert.alert('Atenção', 'Preencha todos os campos.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Atenção', 'As senhas não conferem.');
            return;
        }

        try {
            // Não estamos passando avatar aqui (só na tela de Profile)
            await signUp(name, email, password);

            // ✅ Ajuste o nome da rota principal da sua aplicação
            router.replace('/(tabs)');
        } catch (error: any) {
            Alert.alert(
                'Erro ao criar conta',
                error?.message ?? 'Não foi possível criar sua conta.'
            );
        }
    }

    function handleGoToSignIn() {
        router.replace('/(auth)/sign-in');
    }

    return (
        <AuthLayout>
            {/* Top Section: Logo & Title */}
            <AuthHeader
                appName="WanderWe"
                tagline="Crie sua conta e comece a planejar sua próxima viagem."
            />

            {/* Form Section */}
            <View style={styles.formContainer}>
                {/* Nome */}
                <View style={styles.inputGroup}>
                    <AuthInput
                        label="NOME COMPLETO"
                        iconName="person-outline"
                        placeholder="Seu nome"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                    />
                </View>

                {/* Email */}
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

                {/* Senha */}
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
                </View>

                {/* Confirmar Senha */}
                <View style={styles.inputGroup}>
                    <AuthInput
                        label="CONFIRMAR SENHA"
                        iconName="lock-closed-outline"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        isPassword
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>

                {/* Botão Criar conta */}
                <TouchableOpacity
                    style={styles.signInButton}
                    activeOpacity={0.8}
                    onPress={handleSignUp}
                    disabled={isLoading}
                >
                    <Text style={styles.signInButtonText}>Criar conta</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Section: Social & Login Link */}
            <View style={styles.bottomSection}>
                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>Ou cadastre-se com</Text>
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

                <View className="" style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Já tem uma conta? </Text>
                    <TouchableOpacity onPress={handleGoToSignIn}>
                        <Text style={styles.signUpLink}>Entrar</Text>
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

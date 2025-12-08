import { useTheme } from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const { width, height } = Dimensions.get('window');

export default function Onboarding() {
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ImageBackground
                source={{
                    uri: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=1000&auto=format&fit=crop',
                }}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <LinearGradient
                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.9)']}
                    style={styles.gradient}
                >

                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >

                        {/* Navegação Superior */}
                        <View style={styles.topNav}>
                            <View style={styles.logoContainer}>
                                <View style={[styles.logoIcon, { backgroundColor: colors.primary }]}>
                                    <Ionicons name="location-outline" size={20} color={colors.text} />
                                </View>
                                <Text style={[styles.logoText, { color: colors.text }]}>WanderWe</Text>
                            </View>

                            <TouchableOpacity>
                                <Text style={[styles.skipButton, { color: colors.text }]}>Pular</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Espaçador para empurrar conteúdo para baixo */}
                        <View style={styles.spacer} />

                        {/* Conteúdo Principal */}
                        <View style={styles.mainContent}>
                            {/* Conteúdo de Texto */}
                            <View style={styles.textContent}>
                                <Text style={styles.title}>
                                    Planejem Juntos,{'\n'}
                                    <Text style={{ color: colors.primary }}>Viajem Mais Longe</Text>
                                </Text>
                                <Text style={[styles.subtitle, { color: colors.text }]}>
                                    Colaborem em roteiros, dividam despesas e compartilhem memórias em tempo real com seu grupo de viagem.
                                </Text>
                            </View>

                            {/* Indicadores do Carrossel */}
                            <View style={styles.indicators}>
                                <View style={[styles.indicatorActive, { backgroundColor: colors.primary }]} />
                                <View style={[styles.indicatorInactive]} />
                                <View style={[styles.indicatorInactive]} />
                            </View>

                            {/* Botões de Ação */}
                            <View style={styles.actionButtons}>
                                <TouchableOpacity
                                    style={[styles.primaryButton, { backgroundColor: colors.primary }]}
                                    activeOpacity={0.8}
                                >
                                    <Text style={[styles.primaryButtonText, { color: colors.text }]}>Começar</Text>
                                    <Ionicons name="arrow-forward" size={20} style={{ color: colors.text }} />
                                </TouchableOpacity>

                                <View style={styles.loginContainer}>
                                    <Text style={[styles.loginText, { color: colors.text }]}>Já tem uma conta? </Text>
                                    <TouchableOpacity>
                                        <Text style={[styles.loginButton, { color: colors.primary }]}>Entrar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </ScrollView>


                </LinearGradient>

            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    gradient: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    topNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIcon: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    skipButton: {
        fontSize: 16,
    },
    spacer: {
        flex: 1,
    },
    mainContent: {
        padding: 20,
    },
    textContent: {
        marginBottom: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 16,
    },
    indicators: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    indicatorActive: {
        width: 20,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    indicatorInactive: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginHorizontal: 4,
    },
    actionButtons: {
        alignItems: 'center',
    },
    primaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginBottom: 20,
    },
    primaryButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loginText: {
        color: '#fff',
    },
    loginButton: {
        fontWeight: 'bold',
    },
});
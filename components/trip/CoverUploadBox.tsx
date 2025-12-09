// src/components/trip/CoverUploadBox.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewProps,
} from 'react-native';

type CoverUploadBoxProps = ViewProps & {
    onPress?: () => void;
    imageUri?: string | null;
};

export function CoverUploadBox({ onPress, imageUri, style, ...rest }: CoverUploadBoxProps) {
    return (
        <View {...rest}>
            <Text style={styles.label}>Cover Photo</Text>

            {/* Se tem imagem, mostra preview */}
            {imageUri ? (
                <TouchableOpacity
                    style={[styles.coverBox, styles.coverBoxWithImage, style]}
                    activeOpacity={0.9}
                    onPress={onPress}
                >
                    <ImageBackground
                        source={{ uri: imageUri }}
                        style={styles.imageBackground}
                        imageStyle={styles.imageStyle}
                    >
                        <View style={styles.imageOverlay}>
                            <View style={styles.changeButton}>
                                <Ionicons name="camera" size={18} color="#FFFFFF" />
                                <Text style={styles.changeButtonText}>
                                    Change Photo
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            ) : (
                /* Estado inicial sem imagem */
                <TouchableOpacity
                    style={[styles.coverBox, style]}
                    activeOpacity={0.9}
                    onPress={onPress}
                >
                    <View style={styles.coverInner}>
                        <View style={styles.coverIconCircle}>
                            <Ionicons
                                name="cloud-upload-outline"
                                size={22}
                                color="#FF6B6B"
                            />
                        </View>
                        <Text style={styles.coverTitle}>Tap to upload cover</Text>
                        <Text style={styles.coverSubtitle}>JPG or PNG up to 5MB</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 6,
        marginLeft: 4,
    },
    coverBox: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 24,
        borderColor: '#e5e7eb',
        backgroundColor: '#ffffff',
        height: 190,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    coverBoxWithImage: {
        borderStyle: 'solid',
        borderWidth: 0,
        borderColor: 'transparent',
    },
    coverInner: {
        alignItems: 'center',
    },
    coverIconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'rgba(255,107,107,0.08)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    coverTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6b7280',
    },
    coverSubtitle: {
        fontSize: 11,
        color: '#9ca3af',
        marginTop: 2,
    },

    // Estilos do preview
    imageBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        borderRadius: 24,
    },
    imageOverlay: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
    },
    changeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 107, 107, 0.95)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        gap: 6,
    },
    changeButtonText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});
// src/components/common/LoadingOverlay.tsx
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import {
    ActivityIndicator,
    Modal,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type LoadingOverlayProps = {
    visible: boolean;
    text?: string;
};

export function LoadingOverlay({ visible, text }: LoadingOverlayProps) {
    const { colors } = useTheme();

    if (!visible) return null;

    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
        >
            <View style={styles.backdrop}>
                <View
                    style={[
                        styles.content,
                        {
                            backgroundColor: colors.surface ?? '#0f172a',
                            shadowColor: colors.shadow ?? '#000',
                        },
                    ]}
                >
                    <ActivityIndicator
                        size="large"
                        color={colors.primary ?? '#FF6B6B'}
                    />
                    {text ? (
                        <Text
                            style={[
                                styles.text,
                                { color: colors.text ?? '#e5e7eb' },
                            ]}
                        >
                            {text}
                        </Text>
                    ) : null}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(15, 23, 42, 0.65)', // overlay escuro
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        minWidth: 140,
        maxWidth: 220,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 10,
    },
    text: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
});

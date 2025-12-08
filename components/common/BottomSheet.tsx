// src/components/common/BottomSheet.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { ReactNode } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type BottomSheetProps = {
    title: string;
    children: ReactNode;
    footer?: ReactNode;
    onClose?: () => void;
};

export function BottomSheet({ title, children, footer, onClose }: BottomSheetProps) {
    return (
        <View style={styles.backdrop}>
            <View style={styles.sheet}>
                {/* Handle */}
                <View style={styles.handleWrapper}>
                    <View style={styles.handle} />
                </View>

                {/* Header */}
                <View style={styles.headerRow}>
                    <Text style={styles.headerTitle}>{title}</Text>
                    {onClose && (
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={onClose}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="close" size={18} color="#6b7280" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Conteúdo */}
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={styles.contentContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>

                {/* Footer */}
                {footer ? <View style={styles.footer}>{footer}</View> : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(15,23,42,0.4)',
        justifyContent: 'flex-end',
    },
    sheet: {
        height: '92%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 16,
    },
    handleWrapper: {
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 4,
    },
    handle: {
        width: 48,
        height: 6,
        borderRadius: 999,
        backgroundColor: '#d1d5db',
    },
    headerRow: {
        paddingHorizontal: 20,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    closeButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f3f4f6',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 20,
        paddingBottom: 22,
        paddingTop: 10,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 12,
    },
});

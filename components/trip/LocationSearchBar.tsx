// src/components/trip/LocationSearchBar.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from 'react-native';

type LocationSearchBarProps = TextInputProps & {
    onPressLocate?: () => void;
};

export function LocationSearchBar({
    onPressLocate,
    ...textInputProps
}: LocationSearchBarProps) {
    return (
        <View style={styles.searchWrapper}>
            <Ionicons
                name="search-outline"
                size={18}
                color="#9ca3af"
                style={styles.searchIcon}
            />
            <TextInput
                placeholderTextColor="#9ca3af"
                style={styles.searchInput}
                {...textInputProps}
            />
            <TouchableOpacity
                style={styles.locateButton}
                onPress={onPressLocate}
                activeOpacity={0.8}
            >
                <Ionicons name="locate-outline" size={18} color="#9ca3af" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9fafb',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        paddingHorizontal: 12,
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
        marginTop: 2,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#111827',
    },
    locateButton: {
        marginLeft: 6,
    },
});

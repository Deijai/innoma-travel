// src/components/common/TextAreaWithCounter.tsx
import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    View,
} from 'react-native';

type TextAreaWithCounterProps = TextInputProps & {
    value: string;
    onChangeText: (text: string) => void;
    maxLength?: number;
};

export function TextAreaWithCounter({
    value,
    onChangeText,
    maxLength = 200,
    ...rest
}: TextAreaWithCounterProps) {
    return (
        <View style={styles.textAreaWrapper}>
            <TextInput
                multiline
                numberOfLines={4}
                style={styles.textArea}
                placeholderTextColor="#9ca3af"
                textAlignVertical="top"
                value={value}
                onChangeText={onChangeText}
                maxLength={maxLength}
                {...rest}
            />
            <Text style={styles.charCounter}>
                {value.length}/{maxLength}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    textAreaWrapper: {
        marginTop: 4,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        backgroundColor: '#f9fafb',
        paddingHorizontal: 10,
        paddingTop: 8,
        paddingBottom: 18,
        position: 'relative',
    },
    textArea: {
        minHeight: 80,
        fontSize: 14,
        color: '#111827',
    },
    charCounter: {
        position: 'absolute',
        right: 12,
        bottom: 6,
        fontSize: 11,
        color: '#9ca3af',
        fontWeight: '500',
    },
});

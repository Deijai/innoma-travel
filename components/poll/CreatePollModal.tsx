// components/poll/CreatePollModal.tsx
import { createPoll } from '@/services/pollService';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type Props = {
    visible: boolean;
    tripId: string;
    onClose: () => void;
    onSuccess: () => void;
};

export function CreatePollModal({ visible, tripId, onClose, onSuccess }: Props) {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleAddOption() {
        if (options.length < 6) {
            setOptions([...options, '']);
        }
    }

    function handleRemoveOption(index: number) {
        if (options.length > 2) {
            setOptions(options.filter((_, i) => i !== index));
        }
    }

    function handleOptionChange(index: number, value: string) {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    }

    async function handleSubmit() {
        if (!question.trim()) {
            alert('Please enter a question');
            return;
        }

        const validOptions = options.filter((opt) => opt.trim() !== '');

        if (validOptions.length < 2) {
            alert('Please provide at least 2 options');
            return;
        }

        try {
            setIsSubmitting(true);

            await createPoll({
                tripId,
                question,
                options: validOptions,
            });

            // Reset form
            setQuestion('');
            setOptions(['', '']);

            onSuccess();
            onClose();
        } catch (error: any) {
            console.error('Error creating poll:', error);
            alert(error?.message ?? 'Failed to create poll');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.backdrop}>
                <View style={styles.sheet}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={styles.title}>New Poll</Text>
                        <TouchableOpacity onPress={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? (
                                <ActivityIndicator size="small" color="#FF6B6B" />
                            ) : (
                                <Text style={styles.createText}>Create</Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        style={styles.content}
                        contentContainerStyle={{ paddingBottom: 40 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* Question */}
                        <Text style={styles.label}>Question</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Which day for Universal Studios?"
                            value={question}
                            onChangeText={setQuestion}
                            multiline
                        />

                        {/* Options */}
                        <Text style={styles.label}>Options</Text>
                        {options.map((option, index) => (
                            <View key={index} style={styles.optionRow}>
                                <TextInput
                                    style={[styles.input, styles.optionInput]}
                                    placeholder={`Option ${index + 1}`}
                                    value={option}
                                    onChangeText={(value) => handleOptionChange(index, value)}
                                />
                                {options.length > 2 && (
                                    <TouchableOpacity
                                        style={styles.removeButton}
                                        onPress={() => handleRemoveOption(index)}
                                    >
                                        <Ionicons name="close-circle" size={24} color="#ef4444" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))}

                        {/* Add Option Button */}
                        {options.length < 6 && (
                            <TouchableOpacity
                                style={styles.addOptionButton}
                                onPress={handleAddOption}
                            >
                                <Ionicons name="add-circle-outline" size={20} color="#FF6B6B" />
                                <Text style={styles.addOptionText}>Add Option</Text>
                            </TouchableOpacity>
                        )}

                        <Text style={styles.helperText}>
                            You can add up to 6 options. Minimum 2 required.
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    sheet: {
        flex: 0.75,
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    cancelText: {
        fontSize: 16,
        color: '#6b7280',
    },
    createText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF6B6B',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
        marginTop: 16,
    },
    input: {
        backgroundColor: '#f9fafb',
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 14,
        color: '#111827',
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        gap: 8,
    },
    optionInput: {
        flex: 1,
    },
    removeButton: {
        padding: 4,
    },
    addOptionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#FF6B6B',
        marginTop: 8,
        gap: 6,
    },
    addOptionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF6B6B',
    },
    helperText: {
        fontSize: 12,
        color: '#9ca3af',
        marginTop: 12,
        textAlign: 'center',
    },
});
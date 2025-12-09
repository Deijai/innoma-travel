// components/proposal/CreateProposalModal.tsx
import type { ProposalCategory, ProposalType } from '@/services/proposalService';
import { createProposal } from '@/services/proposalService';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Image,
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

export function CreateProposalModal({ visible, tripId, onClose, onSuccess }: Props) {
    const [type, setType] = useState<ProposalType>('restaurant');
    const [category, setCategory] = useState<ProposalCategory>('dinner');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priceRange, setPriceRange] = useState<'$' | '$$' | '$$$' | '$$$$' | null>(null);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const types: { value: ProposalType; label: string; icon: string }[] = [
        { value: 'restaurant', label: 'Restaurant', icon: 'restaurant-outline' },
        { value: 'activity', label: 'Activity', icon: 'flame-outline' },
        { value: 'accommodation', label: 'Hotel', icon: 'bed-outline' },
    ];

    const categories: { value: ProposalCategory; label: string }[] = [
        { value: 'dinner', label: 'Dinner' },
        { value: 'lunch', label: 'Lunch' },
        { value: 'breakfast', label: 'Breakfast' },
        { value: 'attraction', label: 'Attraction' },
        { value: 'transport', label: 'Transport' },
        { value: 'other', label: 'Other' },
    ];

    const priceRanges: ('$' | '$$' | '$$$' | '$$$$')[] = ['$', '$$', '$$$', '$$$$'];

    async function handlePickImage() {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission needed to access photos');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.8,
            });

            if (!result.canceled) {
                setImageUri(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image:', error);
        }
    }

    async function handleSubmit() {
        if (!title.trim()) {
            alert('Please enter a title');
            return;
        }

        if (!description.trim()) {
            alert('Please enter a description');
            return;
        }

        try {
            setIsSubmitting(true);

            await createProposal({
                tripId,
                type,
                category,
                title,
                description,
                imageLocalUri: imageUri,
                priceRange,
            });

            // Reset form
            setTitle('');
            setDescription('');
            setImageUri(null);
            setPriceRange(null);
            setType('restaurant');
            setCategory('dinner');

            onSuccess();
            onClose();
        } catch (error: any) {
            console.error('Error creating proposal:', error);
            alert(error?.message ?? 'Failed to create proposal');
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
                        <Text style={styles.title}>New Proposal</Text>
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
                        {/* Type */}
                        <Text style={styles.label}>Type</Text>
                        <View style={styles.typeRow}>
                            {types.map((t) => (
                                <TouchableOpacity
                                    key={t.value}
                                    style={[
                                        styles.typeButton,
                                        type === t.value && styles.typeButtonActive,
                                    ]}
                                    onPress={() => setType(t.value)}
                                >
                                    <Ionicons
                                        name={t.icon as any}
                                        size={20}
                                        color={type === t.value ? '#FF6B6B' : '#6b7280'}
                                    />
                                    <Text
                                        style={[
                                            styles.typeButtonText,
                                            type === t.value && styles.typeButtonTextActive,
                                        ]}
                                    >
                                        {t.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Category */}
                        <Text style={styles.label}>Category</Text>
                        <View style={styles.categoryRow}>
                            {categories.map((c) => (
                                <TouchableOpacity
                                    key={c.value}
                                    style={[
                                        styles.categoryChip,
                                        category === c.value && styles.categoryChipActive,
                                    ]}
                                    onPress={() => setCategory(c.value)}
                                >
                                    <Text
                                        style={[
                                            styles.categoryChipText,
                                            category === c.value && styles.categoryChipTextActive,
                                        ]}
                                    >
                                        {c.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Title */}
                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Ichiran Ramen Kyoto"
                            value={title}
                            onChangeText={setTitle}
                        />

                        {/* Description */}
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Tell us more about this place..."
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />

                        {/* Price Range */}
                        <Text style={styles.label}>Price Range (optional)</Text>
                        <View style={styles.priceRow}>
                            {priceRanges.map((p) => (
                                <TouchableOpacity
                                    key={p}
                                    style={[
                                        styles.priceButton,
                                        priceRange === p && styles.priceButtonActive,
                                    ]}
                                    onPress={() => setPriceRange(p)}
                                >
                                    <Text
                                        style={[
                                            styles.priceButtonText,
                                            priceRange === p && styles.priceButtonTextActive,
                                        ]}
                                    >
                                        {p}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Image */}
                        <Text style={styles.label}>Photo (optional)</Text>
                        {imageUri ? (
                            <View style={styles.imagePreview}>
                                <Image source={{ uri: imageUri }} style={styles.image} />
                                <TouchableOpacity
                                    style={styles.removeImageButton}
                                    onPress={() => setImageUri(null)}
                                >
                                    <Ionicons name="close-circle" size={24} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={styles.uploadButton}
                                onPress={handlePickImage}
                            >
                                <Ionicons name="image-outline" size={24} color="#6b7280" />
                                <Text style={styles.uploadButtonText}>Add Photo</Text>
                            </TouchableOpacity>
                        )}
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
        flex: 0.9,
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
    typeRow: {
        flexDirection: 'row',
        gap: 12,
    },
    typeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: '#f9fafb',
        borderWidth: 2,
        borderColor: 'transparent',
        gap: 6,
    },
    typeButtonActive: {
        backgroundColor: '#fff5f5',
        borderColor: '#FF6B6B',
    },
    typeButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6b7280',
    },
    typeButtonTextActive: {
        color: '#FF6B6B',
        fontWeight: '600',
    },
    categoryRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    categoryChip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: '#f3f4f6',
    },
    categoryChipActive: {
        backgroundColor: '#FF6B6B',
    },
    categoryChipText: {
        fontSize: 13,
        fontWeight: '500',
        color: '#6b7280',
    },
    categoryChipTextActive: {
        color: '#fff',
        fontWeight: '600',
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
    textArea: {
        minHeight: 100,
        paddingTop: 12,
    },
    priceRow: {
        flexDirection: 'row',
        gap: 8,
    },
    priceButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#f9fafb',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    priceButtonActive: {
        backgroundColor: '#fff5f5',
        borderColor: '#FF6B6B',
    },
    priceButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6b7280',
    },
    priceButtonTextActive: {
        color: '#FF6B6B',
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        borderRadius: 12,
        backgroundColor: '#f9fafb',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#d1d5db',
        gap: 8,
    },
    uploadButtonText: {
        fontSize: 14,
        color: '#6b7280',
        fontWeight: '500',
    },
    imagePreview: {
        position: 'relative',
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    removeImageButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 12,
    },
});
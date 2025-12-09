// components/trip/TripChatScreen.tsx
import { useMessageStore } from '@/stores/messageStore';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { ChatMessage } from '../chat/ChatMessage';

type Props = {
    tripId: string;
    tripTitle?: string; // nome/destino da viagem (opcional)
};

export function TripChatScreen({ tripId, tripTitle }: Props) {
    const {
        messages,
        isLoading,
        subscribeToChat,
        unsubscribeFromChat,
        send,
    } = useMessageStore();

    const [inputMessage, setInputMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    // Inscreve no chat ao montar
    useEffect(() => {
        console.log('💬 Inscrevendo no chat da trip:', tripId);
        subscribeToChat(tripId);

        // Cleanup ao desmontar
        return () => {
            console.log('💬 Desinscrevendo do chat');
            unsubscribeFromChat();
        };
    }, [tripId, subscribeToChat, unsubscribeFromChat]);

    // Scroll para o final quando novas mensagens chegam
    useEffect(() => {
        if (messages.length > 0 && flatListRef.current) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    }, [messages.length]);

    // Mock de função para pegar nome/avatar do usuário
    const getUserName = useCallback((userId: string) => {
        return 'Member';
    }, []);

    const getUserAvatar = useCallback((userId: string) => {
        return `https://i.pravatar.cc/150?u=${userId}`;
    }, []);

    const handleSend = useCallback(async () => {
        if (!inputMessage.trim() || isSending) return;

        setIsSending(true);
        try {
            await send(tripId, inputMessage);
            setInputMessage('');
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
        } finally {
            setIsSending(false);
        }
    }, [inputMessage, isSending, tripId, send]);

    if (isLoading && messages.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF6B6B" />
                <Text style={styles.loadingText}>Loading chat...</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            {/* 🔹 Header mostrando a qual viagem esse chat pertence */}
            <View style={styles.header}>
                <View style={styles.headerIconContainer}>
                    <Ionicons name="airplane-outline" size={20} color="#FF6B6B" />
                </View>
                <View style={styles.headerTextWrapper}>
                    <Text style={styles.headerTitle} numberOfLines={1}>
                        {tripTitle || 'Trip chat'}
                    </Text>
                    <Text style={styles.headerSubtitle} numberOfLines={1}>
                        Trip ID: {tripId}
                    </Text>
                </View>
            </View>

            {/* Lista de mensagens */}
            {messages.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Ionicons name="chatbubbles-outline" size={48} color="#d1d5db" />
                    <Text style={styles.emptyText}>No messages yet</Text>
                    <Text style={styles.emptySubtext}>Start the conversation!</Text>
                </View>
            ) : (
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <ChatMessage
                            message={item}
                            getUserName={getUserName}
                            getUserAvatar={getUserAvatar}
                        />
                    )}
                    contentContainerStyle={styles.messagesList}
                    showsVerticalScrollIndicator={false}
                />
            )}

            {/* Input de mensagem */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    placeholderTextColor="#9ca3af"
                    value={inputMessage}
                    onChangeText={setInputMessage}
                    multiline
                    maxLength={500}
                />
                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        (!inputMessage.trim() || isSending) &&
                        styles.sendButtonDisabled,
                    ]}
                    onPress={handleSend}
                    disabled={!inputMessage.trim() || isSending}
                >
                    {isSending ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Ionicons name="send" size={20} color="#fff" />
                    )}
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    // HEADER
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    headerIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#fef2f2',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    headerTextWrapper: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
    },
    headerSubtitle: {
        marginTop: 2,
        fontSize: 12,
        color: '#6b7280',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#6b7280',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 100,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6b7280',
        marginTop: 12,
    },
    emptySubtext: {
        fontSize: 13,
        color: '#9ca3af',
        marginTop: 4,
    },
    messagesList: {
        paddingTop: 16,
        paddingBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        gap: 8,
    },
    input: {
        flex: 1,
        backgroundColor: '#f3f4f6',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 14,
        color: '#111827',
        maxHeight: 100,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FF6B6B',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#fecaca',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 3,
    },
    sendButtonDisabled: {
        backgroundColor: '#d1d5db',
        shadowOpacity: 0,
    },
});

// src/components/toast/ToastProvider.tsx
import { useTheme } from '@/hooks/useTheme';
import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type ToastType = 'info' | 'success' | 'error';

type ToastOptions = {
    type?: ToastType;
    title?: string;
    message: string;
    duration?: number; // ms
};

type ToastState = {
    id: number;
    type: ToastType;
    title?: string;
    message: string;
};

type ToastContextValue = {
    showToast: (options: ToastOptions) => void;
    hideToast: () => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toast, setToast] = useState<ToastState | null>(null);
    const opacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(-30)).current;
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showToast = useCallback((options: ToastOptions) => {
        // limpa timeout anterior
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        const nextToast: ToastState = {
            id: Date.now(),
            type: options.type ?? 'info',
            title: options.title,
            message: options.message,
        };

        setToast(nextToast);

        // anima entrar
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 180,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.spring(translateY, {
                toValue: 0,
                friction: 6,
                useNativeDriver: true,
            }),
        ]).start();

        const duration = options.duration ?? 3500;

        timeoutRef.current = setTimeout(() => {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 180,
                    easing: Easing.in(Easing.quad),
                    useNativeDriver: true,
                }),
                Animated.timing(translateY, {
                    toValue: -20,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                setToast(null);
            });
        }, duration);
    }, [opacity, translateY]);

    const hideToast = useCallback(() => {
        if (!toast) return;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 180,
                easing: Easing.in(Easing.quad),
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: -20,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setToast(null);
        });
    }, [toast, opacity, translateY]);

    const value = useMemo(
        () => ({
            showToast,
            hideToast,
        }),
        [showToast, hideToast]
    );

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer
                toast={toast}
                opacity={opacity}
                translateY={translateY}
                onPress={hideToast}
            />
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error('useToast deve ser usado dentro de ToastProvider');
    }
    return ctx;
}

type ToastContainerProps = {
    toast: ToastState | null;
    opacity: Animated.Value;
    translateY: Animated.Value;
    onPress: () => void;
};

function ToastContainer({
    toast,
    opacity,
    translateY,
    onPress,
}: ToastContainerProps) {
    const { colors } = useTheme();

    if (!toast) return null;

    const bgByType: Record<ToastType, string> = {
        info: colors.surface ?? '#0f172a',
        success: colors.success ?? '#16a34a',
        error: colors.error ?? '#dc2626',
    };

    const borderByType: Record<ToastType, string> = {
        info: colors.primary ?? '#3b82f6',
        success: colors.success ?? '#16a34a',
        error: colors.error ?? '#dc2626',
    };

    const backgroundColor = bgByType[toast.type];
    const borderColor = borderByType[toast.type];

    return (
        <View pointerEvents="box-none" style={stylesToast.wrapper}>
            <Animated.View
                style={[
                    stylesToast.container,
                    {
                        opacity,
                        transform: [{ translateY }],
                        backgroundColor,
                        borderColor,
                        shadowColor: colors.shadow ?? '#000',
                    },
                ]}
            >
                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={onPress}
                    style={stylesToast.touchable}
                >
                    {toast.title ? (
                        <Text
                            style={[
                                stylesToast.title,
                                { color: colors.text ?? '#f9fafb' },
                            ]}
                        >
                            {toast.title}
                        </Text>
                    ) : null}

                    <Text
                        style={[
                            stylesToast.message,
                            { color: colors.textTertiary ?? '#e5e7eb' },
                        ]}
                    >
                        {toast.message}
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}

const stylesToast = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        alignItems: 'center',
        pointerEvents: 'box-none',
    },
    container: {
        maxWidth: '92%',
        borderRadius: 16,
        borderWidth: 1,
        paddingHorizontal: 14,
        paddingVertical: 10,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 6,
    },
    touchable: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 2,
    },
    message: {
        fontSize: 13,
        fontWeight: '500',
    },
});

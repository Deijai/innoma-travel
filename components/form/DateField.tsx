// src/components/form/DateField.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';

type DateFieldProps = {
    label: string;
    value: string | null; // "2025-12-30" ou null
    onChange: (isoDate: string) => void;
    placeholder?: string;
};

export function DateField({
    label,
    value,
    onChange,
    placeholder = 'Select a date',
}: DateFieldProps) {
    const { colors, isDark } = useTheme();
    const [open, setOpen] = useState(false);

    // Converte string ISO para Date corretamente
    const currentDate = useMemo(() => {
        if (!value) return new Date();
        const [year, month, day] = value.split('-').map(Number);
        const d = new Date(year, month - 1, day);
        return isNaN(d.getTime()) ? new Date() : d;
    }, [value]);

    // Formata a data para exibição (DD/MM/YYYY)
    const displayValue = useMemo(() => {
        if (!value) return null;
        const [year, month, day] = value.split('-');
        return `${day}/${month}/${year}`;
    }, [value]);

    // Estado do picker customizado
    const [selectedDay, setSelectedDay] = useState(currentDate.getDate());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

    // Gera arrays para os pickers
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 50 + i);

    function handleOpenPicker() {
        setSelectedDay(currentDate.getDate());
        setSelectedMonth(currentDate.getMonth());
        setSelectedYear(currentDate.getFullYear());
        setOpen(true);
    }

    function handleConfirm() {
        const year = selectedYear;
        const month = String(selectedMonth + 1).padStart(2, '0');
        const day = String(selectedDay).padStart(2, '0');
        const iso = `${year}-${month}-${day}`;
        onChange(iso);
        setOpen(false);
    }

    const textColor = isDark ? '#FFFFFF' : '#1F2937';
    const mutedColor = isDark ? '#9CA3AF' : '#6B7280';
    const displayColor = value ? textColor : mutedColor;

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: textColor }]}>{label}</Text>

            <TouchableOpacity
                onPress={handleOpenPicker}
                style={[
                    styles.button,
                    {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                    },
                ]}
            >
                <Text style={[styles.valueText, { color: displayColor }]}>
                    {displayValue ?? placeholder}
                </Text>
                <Ionicons name="calendar-outline" size={20} color={mutedColor} />
            </TouchableOpacity>

            {/* Modal com picker customizado */}
            <Modal visible={open} transparent animationType="slide">
                <View style={styles.modalBackdrop}>
                    <View
                        style={[
                            styles.modalContent,
                            { backgroundColor: colors.card },
                        ]}
                    >
                        <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
                            <TouchableOpacity onPress={() => setOpen(false)}>
                                <Text style={[styles.modalButton, { color: mutedColor }]}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>

                            <Text style={[styles.modalTitle, { color: textColor }]}>
                                {label}
                            </Text>

                            <TouchableOpacity onPress={handleConfirm}>
                                <Text style={[styles.modalButton, { color: colors.primary, fontWeight: '600' }]}>
                                    Confirmar
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.pickerContainer}>
                            {/* Dia */}
                            <View style={styles.pickerColumn}>
                                <Text style={[styles.pickerLabel, { color: mutedColor }]}>Dia</Text>
                                <ScrollView style={styles.picker} showsVerticalScrollIndicator={false}>
                                    {days.map(day => (
                                        <TouchableOpacity
                                            key={day}
                                            onPress={() => setSelectedDay(day)}
                                            style={[
                                                styles.pickerItem,
                                                selectedDay === day && { backgroundColor: colors.primary + '20' }
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.pickerItemText,
                                                    { color: textColor },
                                                    selectedDay === day && { color: colors.primary, fontWeight: '600' }
                                                ]}
                                            >
                                                {day}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>

                            {/* Mês */}
                            <View style={[styles.pickerColumn, styles.pickerColumnWide]}>
                                <Text style={[styles.pickerLabel, { color: mutedColor }]}>Mês</Text>
                                <ScrollView style={styles.picker} showsVerticalScrollIndicator={false}>
                                    {months.map((month, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => setSelectedMonth(index)}
                                            style={[
                                                styles.pickerItem,
                                                selectedMonth === index && { backgroundColor: colors.primary + '20' }
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.pickerItemText,
                                                    { color: textColor },
                                                    selectedMonth === index && { color: colors.primary, fontWeight: '600' }
                                                ]}
                                            >
                                                {month}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>

                            {/* Ano */}
                            <View style={styles.pickerColumn}>
                                <Text style={[styles.pickerLabel, { color: mutedColor }]}>Ano</Text>
                                <ScrollView style={styles.picker} showsVerticalScrollIndicator={false}>
                                    {years.map(year => (
                                        <TouchableOpacity
                                            key={year}
                                            onPress={() => setSelectedYear(year)}
                                            style={[
                                                styles.pickerItem,
                                                selectedYear === year && { backgroundColor: colors.primary + '20' }
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.pickerItemText,
                                                    { color: textColor },
                                                    selectedYear === year && { color: colors.primary, fontWeight: '600' }
                                                ]}
                                            >
                                                {year}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
    },
    label: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 4,
        marginLeft: 4,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    valueText: {
        fontSize: 14,
        flex: 1,
        marginRight: 8,
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 34,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    modalButton: {
        fontSize: 16,
        minWidth: 70,
    },
    pickerContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 16,
        height: 300,
    },
    pickerColumn: {
        flex: 1,
        marginHorizontal: 4,
    },
    pickerColumnWide: {
        flex: 2,
    },
    pickerLabel: {
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
    },
    picker: {
        flex: 1,
    },
    pickerItem: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginBottom: 4,
    },
    pickerItemText: {
        fontSize: 14,
        textAlign: 'center',
    },
});
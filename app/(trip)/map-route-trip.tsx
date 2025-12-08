// MapRouteScreen.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function MapRouteScreen() {
    return (
        <View style={styles2.container}>
            <StatusBar barStyle="dark-content" />

            {/* “Mapa” – só um fundo estilizado */}
            <View style={styles2.mapBackground} />

            {/* Header floating */}
            <View style={styles2.headerBar}>
                <TouchableOpacity style={styles2.roundButton}>
                    <Ionicons name="arrow-back" size={18} color="#4b5563" />
                </TouchableOpacity>

                <View style={styles2.toolsColumn}>
                    <TouchableOpacity style={styles2.roundButton}>
                        <Ionicons name="layers-outline" size={18} color="#4b5563" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles2.roundButton}>
                        <Ionicons name="locate-outline" size={18} color="#4b5563" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Pins */}
            {/* Pin 1 */}
            <View style={[styles2.pinContainer, { top: 140, left: 80 }]}>
                <View style={styles2.pinLabelHidden}>
                    <Text style={styles2.pinLabelText}>Sunny Cove Beach</Text>
                </View>
                <View style={[styles2.pinCircle, { backgroundColor: '#3b82f6' }]}>
                    <Text style={styles2.pinNumber}>1</Text>
                </View>
                <View
                    style={[
                        styles2.pinTriangle,
                        { borderTopColor: '#3b82f6' },
                    ]}
                />
            </View>

            {/* Pin 2 – ativo */}
            <View style={[styles2.pinContainer, { top: 280, left: 220 }]}>
                <View style={styles2.pinLabelActive}>
                    <Text style={styles2.pinLabelTitle}>Taco Haven</Text>
                    <Text style={styles2.pinLabelSub}>12:30 PM</Text>
                </View>
                <View style={[styles2.pinCircleActive, { backgroundColor: '#f97316' }]}>
                    <Text style={styles2.pinNumber}>2</Text>
                </View>
                <View
                    style={[
                        styles2.pinTriangle,
                        { borderTopColor: '#f97316' },
                    ]}
                />
            </View>

            {/* Pin 3 */}
            <View style={[styles2.pinContainer, { top: 500, left: 150 }]}>
                <View style={styles2.pinLabelHidden}>
                    <Text style={styles2.pinLabelText}>Sunset Point</Text>
                </View>
                <View style={[styles2.pinCircle, { backgroundColor: '#FF6B6B' }]}>
                    <Text style={styles2.pinNumber}>3</Text>
                </View>
                <View
                    style={[
                        styles2.pinTriangle,
                        { borderTopColor: '#FF6B6B' },
                    ]}
                />
            </View>

            {/* User puck */}
            <View style={styles2.userPuckWrapper}>
                <View style={styles2.userPulse} />
                <View style={styles2.userPuck} />
            </View>

            {/* Bottom sheet */}
            <View style={styles2.sheet}>
                <View style={styles2.handleWrapper}>
                    <View style={styles2.handle} />
                </View>

                <View style={styles2.sheetContent}>
                    {/* Header */}
                    <View style={styles2.sheetHeader}>
                        <View>
                            <Text style={styles2.sheetLabel}>Current Leg</Text>
                            <Text style={styles2.sheetTitle}>To Taco Haven</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles2.timeMain}>
                                12 <Text style={styles2.timeUnit}>min</Text>
                            </Text>
                            <Text style={styles2.timeSub}>4.2 miles</Text>
                        </View>
                    </View>

                    {/* Steps timeline */}
                    <View style={styles2.stepsRow}>
                        <View style={styles2.stepsLine} />
                        {/* Beach */}
                        <View style={[styles2.stepItem, { opacity: 0.5 }]}>
                            <View style={[styles2.stepIcon, { backgroundColor: '#dbeafe' }]}>
                                <Ionicons
                                    name="checkmark"
                                    size={14}
                                    color="#3b82f6"
                                />
                            </View>
                            <Text style={styles2.stepLabelSmall}>Beach</Text>
                        </View>

                        {/* Lunch active */}
                        <View style={[styles2.stepItem, { flex: 1 }]}>
                            <View style={styles2.stepIconActive}>
                                <Ionicons
                                    name="restaurant-outline"
                                    size={16}
                                    color="#f97316"
                                />
                            </View>
                            <Text style={styles2.stepLabel}>Lunch</Text>
                        </View>

                        {/* View */}
                        <View style={[styles2.stepItem, { opacity: 0.5 }]}>
                            <View style={[styles2.stepIcon, { backgroundColor: '#f3f4f6' }]}>
                                <Text style={styles2.stepIconText}>3</Text>
                            </View>
                            <Text style={styles2.stepLabelSmall}>View</Text>
                        </View>
                    </View>

                    {/* Buttons */}
                    <View style={styles2.buttonsRow}>
                        <TouchableOpacity style={styles2.primaryButton}>
                            <Ionicons
                                name="navigate-outline"
                                size={18}
                                color="#ffffff"
                                style={{ marginRight: 6 }}
                            />
                            <Text style={styles2.primaryButtonText}>Start Navigation</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles2.moreButton}>
                            <Ionicons name="ellipsis-horizontal" size={18} color="#4b5563" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles2 = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#e5e7eb' },
    mapBackground: {
        flex: 1,
        backgroundColor: '#e5e7eb',
    },
    headerBar: {
        position: 'absolute',
        top: 40,
        left: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        zIndex: 20,
    },
    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    toolsColumn: {
        flexDirection: 'column',
        rowGap: 8,
    },

    pinContainer: {
        position: 'absolute',
        alignItems: 'center',
        zIndex: 10,
    },
    pinLabelHidden: {
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 6,
        backgroundColor: '#ffffff',
        marginBottom: 4,
        opacity: 0,
    },
    pinLabelText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#4b5563',
    },
    pinLabelActive: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    pinLabelTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: '#111827',
    },
    pinLabelSub: {
        fontSize: 10,
        color: '#6b7280',
        marginLeft: 6,
    },
    pinCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    pinCircleActive: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 3,
        borderColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
    },
    pinNumber: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
    },
    pinTriangle: {
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        marginTop: -1,
    },

    userPuckWrapper: {
        position: 'absolute',
        top: 350,
        left: 300,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userPulse: {
        position: 'absolute',
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#60a5fa',
        opacity: 0.4,
    },
    userPuck: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#3b82f6',
        borderWidth: 2,
        borderColor: '#ffffff',
    },

    sheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
        elevation: 10,
    },
    handleWrapper: {
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 4,
    },
    handle: {
        width: 48,
        height: 5,
        borderRadius: 999,
        backgroundColor: '#d1d5db',
    },
    sheetContent: {
        paddingHorizontal: 24,
        paddingBottom: 18,
        paddingTop: 8,
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 16,
    },
    sheetLabel: {
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: '#9ca3af',
        fontWeight: '600',
    },
    sheetTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#111827',
        marginTop: 4,
    },
    timeMain: {
        fontSize: 22,
        fontWeight: '700',
        color: '#FF6B6B',
    },
    timeUnit: {
        fontSize: 13,
        fontWeight: '500',
        color: '#6b7280',
    },
    timeSub: {
        fontSize: 12,
        color: '#9ca3af',
    },

    stepsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
        position: 'relative',
    },
    stepsLine: {
        position: 'absolute',
        left: 40,
        right: 40,
        height: 2,
        backgroundColor: '#e5e7eb',
        top: 22,
    },
    stepItem: {
        alignItems: 'center',
    },
    stepIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#ffffff',
        marginBottom: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 3,
        elevation: 3,
    },
    stepIconText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#6b7280',
    },
    stepIconActive: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ffedd5',
        borderWidth: 4,
        borderColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.16,
        shadowRadius: 4,
        elevation: 4,
    },
    stepLabelSmall: {
        fontSize: 10,
        color: '#6b7280',
        fontWeight: '500',
    },
    stepLabel: {
        fontSize: 12,
        color: '#111827',
        fontWeight: '700',
    },

    buttonsRow: {
        flexDirection: 'row',
        columnGap: 10,
    },
    primaryButton: {
        flex: 1,
        borderRadius: 18,
        backgroundColor: '#FF6B6B',
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#fecaca',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 8,
    },
    primaryButtonText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#ffffff',
    },
    moreButton: {
        width: 54,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        backgroundColor: '#f9fafb',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

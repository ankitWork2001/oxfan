import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // or any icon library you prefer
import { useNavigation } from '@react-navigation/native'; // <-- needed for goBack()

const { width } = Dimensions.get('window');

const NotificationsScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Notifications</Text>
            </View>

            {/* Body */}
            <View style={styles.content}>
                <Icon name="notifications-off-outline" size={80} color="#ccc" />
                <Text style={styles.title}>No Notifications</Text>
                <Text style={styles.subtitle}>You're all caught up! We'll let you know when something happens.</Text>
            </View>
        </View>
    );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#34A853',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
    },
    backButton: {
        paddingRight: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#fff', // changed to white for better contrast with green background
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center', // centers vertically and horizontally
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        color: '#444',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 14,
        color: '#777',
        textAlign: 'center',
        marginTop: 10,
        paddingHorizontal: 20,
    },
});

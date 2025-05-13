import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';

const AdminTemplateHeaderPart = () => {
    return (
        <SafeAreaView>
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.greetingText}>Hello Rohan,</Text>

                    <View style={styles.iconGroup}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Icon name="search" size={24} color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Icon name="notifications" size={24} color="#000" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.imageContainer}>
                            <Image
                                source={require('../assests/profileScreeenProfileImage.png')}
                                style={styles.image}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AdminTemplateHeaderPart

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    greetingText: {
        fontSize: RFValue(20),
    },
    iconGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: 12,
    },
    imageContainer: {
        height: 32,
        width: 32,
        marginLeft: 12,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: 16,
    },
})
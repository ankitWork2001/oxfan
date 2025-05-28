import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../store/features/auth/authThunk'
import { RFValue } from 'react-native-responsive-fontsize'

const WithdrawalScreen = () => {
    const navigation = useNavigation();
    const { height, width } = Dimensions.get('window');
    const dispatch = useDispatch();
    const { basicUser, userDetails } = useSelector(state => state.auth);

    useEffect(() => {
        if (basicUser?._id && !userDetails) {
            dispatch(getUserDetails(basicUser._id));
        }
        console.log("Withdrawal Screen User  data:", userDetails);
    }, [basicUser, userDetails]);

    if (!userDetails) return null;

    const [selectedMethod, setSelectedMethod] = useState(null);

    const methods = [
        { id: 'bank', label: 'Bank', icon: require('../assests/WithdrawScreenBankImage.png') },
        { id: 'upi', label: 'UPI', icon: require('../assests/WithdrawScreenUpiImage.png') },
        { id: 'crypto', label: 'Crypto', icon: require('../assests/WithdrawScreenCryptoImage.png') },
    ];
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.UpperContainer}>
                <View style={styles.IconContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon style={styles.Icon} name="arrow-back" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon style={styles.Icon} name="notifications" size={24} />
                    </TouchableOpacity>
                </View>

                <View style={styles.contentRow}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            Hi {userDetails.name}, cash out your {"\n"}rewards fast and safe!"
                        </Text>
                        <Text style={styles.balanceText}>Balance : ${userDetails?.wallet?.balance}</Text>
                    </View>
                    <View style={[styles.imageContainer, { top: height * -0.012, left: width * 0.5 }]}>
                        <Image
                            style={styles.image}
                            source={require('../assests/WithdrawalScreenImage.png')}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </View>

            <View style={styles.DownContainer}>
                <Text style={styles.heading}>Withdraw</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter amount (₹100 min)"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                />

                <Text style={styles.selectText}>Select (2% fee, ₹10 min)</Text>

                <View style={styles.optionsRow}>
                    {methods.map((method) => (
                        <TouchableOpacity
                            key={method.id}
                            style={[
                                styles.optionBox,
                                selectedMethod === method.id && styles.selectedBox,
                            ]}
                            onPress={() => setSelectedMethod(method.id)}
                        >
                            <Image source={method.icon} style={styles.optionIcon} />
                            <Text style={styles.optionText}>{method.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.otpButtonConatiner}>
                    <TouchableOpacity style={styles.otpButton}>
                        <Text style={styles.otpButtonText}>Sent OTP</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>

    )
}

export default WithdrawalScreen

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    UpperContainer: {
        backgroundColor: '#34A853',
        paddingTop: 20,
        paddingHorizontal: 16,
    },
    IconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    Icon: {
        color: '#fff',
    },
    contentRow: {
        flexDirection: 'row',
    },
    textContainer: {
        flex: 1,
        paddingRight: 10,
    },
    text: {
        color: '#fff',
        fontSize: RFValue(16),
        fontWeight: '400',
    },
    balanceText: {
        color: '#fff',
        fontSize: RFValue(28),
        fontWeight: '300',
        marginTop: 20,
        marginBottom: 30
    },
    imageContainer: {
        width: 200,
        height: 160,
        position: 'absolute'
    },
    image: {
        height: "100%",
        width: "100%"
    },
    DownContainer: {
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    heading: {
        fontSize: 22,
        fontWeight: '600',
        color: '#1c3b2f',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 20,
    },
    selectText: {
        fontSize: 14,
        marginBottom: 10,
        color: '#333',
    },
    optionsRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    optionBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        padding: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    selectedBox: {
        borderColor: '#1c3b2f',
        backgroundColor: '#e8f5e9',
    },
    optionIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },
    optionText: {
        fontSize: 16,
        fontWeight: '500',
    },
    otpButtonConatiner: {
        alignItems: 'center',
        marginTop: 20
    },
    otpButton: {
        backgroundColor: '#ff8c00',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        width: '60%'
    },
    otpButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

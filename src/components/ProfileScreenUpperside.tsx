import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../store/features/auth/authThunk';
import { useNavigation } from '@react-navigation/native';

const ProfileScreenUpperside = () => {
    const { height } = Dimensions.get('window');
    const navigation = useNavigation();
    const dispatch = useDispatch();
    // const { user } = useSelector(state => state.auth);
    const { basicUser, userDetails } = useSelector(state => state.auth);

    useEffect(() => {
        console.log("basicUser:", basicUser);
        if (basicUser?._id && !userDetails) {
            dispatch(getUserDetails(basicUser._id));
        }
        console.log("User  data:", userDetails);
    }, [basicUser, userDetails]);

    if (!userDetails) return null; // Wait until fully loaded

    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={[styles.profileUppersideContainer, { backgroundColor: '#34A853' }]}>
                <View style={styles.IconMainContainer}>
                    <TouchableOpacity><Icon name='arrow-back' size={24} color='#fff' /></TouchableOpacity>
                    <View style={styles.IconSubContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')}><Icon name='edit-square' size={24} color='#fff' /></TouchableOpacity>
                        <TouchableOpacity><Icon name='settings' size={24} color='#fff' /></TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.profileImageAndTextContainer, { bottom: height * 0.06 }]}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={
                                userDetails?.avatar
                                    ? { uri: `https://vtoxfambackend.onrender.com${userDetails.avatar}` }
                                    : require('../assests/NoProfileImagePic.png') // Corrected path
                            }
                            style={styles.profileImage}
                            resizeMode='contain'
                        />
                    </View>
                    <Text style={styles.profileName}>{userDetails?.username}</Text>
                    {/* <Text style={styles.profileID}>ID: {userDetails._id}</Text> */}
                    <View style={styles.balanceBox}>
                        <Text style={styles.BalanceText}>₹{userDetails?.wallet?.balance} Balance</Text>
                    </View>

                    <Icon style={styles.doubleArrowIcon} color='#FFFFFF' name='keyboard-double-arrow-down' size={24} />
                    <View style={styles.depositAndWithdrawContainer}>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('Deposit') }}
                            style={[styles.depositTextBox, { backgroundColor: '#0653D1', borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }]}
                        >
                            <Text style={styles.depositText}>Deposit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('Withdraw') }}
                            style={[styles.depositTextBox, { backgroundColor: '#FDBE00', borderTopRightRadius: 6, borderBottomRightRadius: 6 }]}
                        >
                            <Text style={styles.depositText}>Withdraw{'\n'}
                                <Text style={styles.rulesText}>Rules: 24hr lock, Min ₹100</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={[styles.levelContainer, { bottom: height * 0.04 }]}>
                <TouchableOpacity style={styles.levelItem}>
                    <Icon name='diamond' size={22} color='#9747FF' />
                    <Text style={styles.levelText}>Level: 5 {'\n'}(Silver)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.levelItem}>
                    <Text style={styles.levelEmoji}>🏆</Text>
                    <Text style={styles.levelText}>Total {'\n'}Wins: ₹560</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.levelItem}>
                    <Icon name='radar' size={22} color='#DB0004' />
                    <Text style={styles.levelText}>Spin Left {'\n'}Today: 2/5</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default ProfileScreenUpperside;

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profileUppersideContainer: {},
    IconMainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 30,
    },
    IconSubContainer: {
        flexDirection: 'row',
        gap: 10
    },
    profileImageAndTextContainer: {
        alignItems: "center",
        width: "100%",
    },
    profileImageContainer: {
        width: 100,
        height: 110,
        borderRadius: 50
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    profileName: {
        fontSize: RFValue(24),
        fontWeight: '400',
        color: '#fff',
        marginTop: 10
    },
    profileID: {
        color: '#fff',
        fontSize: RFValue(10),
        fontWeight: '500',
        marginTop: 2
    },
    balanceBox: {
        marginTop: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        paddingVertical: 8,
        paddingHorizontal: 1,
        borderRadius: 4,
        width: 130
    },
    BalanceText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '300',
    },
    doubleArrowIcon: {
        marginVertical: 15,
    },
    depositAndWithdrawContainer: {
        width: "80%",
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 15
    },
    depositTextBox: {
        width: "50%",
        paddingVertical: 20,
    },
    depositText: {
        fontSize: RFValue(14),
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center'
    },
    rulesText: {
        fontSize: RFValue(6),
    },
    levelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    levelItem: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 20,
        width: 69,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
    },
    levelEmoji: {
        fontSize: RFValue(22)
    },
    levelText: {
        fontSize: RFValue(10),
        fontWeight: '400',
        textAlign: 'center'
    },
});

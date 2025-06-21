import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../store/features/auth/authThunk';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import { fetchWalletBalance } from '../store/features/wallet/walletThunk';
import { AppDispatch } from '../store/store';

const ProfileScreenUpperside = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch<AppDispatch>();
    const { basicUser, userDetails } = useSelector(state => state.auth);
    const [userBalance, setUserBalance] = useState<number>(0);

    useEffect(() => {
        if (basicUser?._id && !userDetails) {
            dispatch(getUserDetails(basicUser._id));
        }
    }, [basicUser, userDetails]);

    useFocusEffect(
        React.useCallback(() => {
            dispatch(fetchWalletBalance())
                .unwrap()
                .then((data) => {
                    const roundedBalance = Number(data.wallet.balance).toFixed(2);
                    setUserBalance(roundedBalance);
                    console.log("wallet data:", roundedBalance);
                })
                .catch((err) => {
                    console.log('Error fetching Wallet:', err);
                });

        }, [dispatch])
    );

    // Now safe to return null after all hooks
    if (!userDetails) return null;

    return (
        <SafeAreaView style={styles.MainContainer}>
            <View style={styles.profileUppersideContainer}>
                <View style={styles.IconMainContainer}>
                    <TouchableOpacity>
                        <Icon name='arrow-back' size={RFValue(24)} color='#fff' />
                    </TouchableOpacity>
                    <View style={styles.IconSubContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('PersonalDetails')}>
                            <Icon name='edit-square' size={RFValue(24)} color='#fff' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                            <Icon name='settings' size={RFValue(24)} color='#fff' />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={[styles.profileImageAndTextContainer, { bottom: hp('4%') }]}>
                    <View style={styles.profileImageContainer}>
                        <Image
                            source={
                                userDetails?.avatar
                                    ? { uri: `https://vtoxfambackend.onrender.com${userDetails.avatar}` }
                                    : require('../assests/NoProfileImagePic.png')
                            }
                            style={styles.profileImage}
                            resizeMode='contain'
                        />
                    </View>
                    <Text style={styles.profileName}>{userDetails?.username}</Text>
                    <View style={styles.balanceBox}>
                        <Text style={styles.BalanceText}>₹{userBalance} Balance</Text>
                    </View>

                    <Icon style={styles.doubleArrowIcon} color='#FFFFFF' name='keyboard-double-arrow-down' size={RFValue(24)} />

                    <View style={styles.depositAndWithdrawContainer}>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('Deposit') }}
                            style={[styles.depositTextBox, styles.depositLeft]}
                        >
                            <Text style={styles.depositText}>Deposit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('Withdraw') }}
                            style={[styles.depositTextBox, styles.depositRight]}
                        >
                            <Text style={styles.depositText}>
                                Withdraw{'\n'}
                                <Text style={styles.rulesText}>Rules: 24hr lock, Min ₹100</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={[styles.levelContainer, { bottom: hp('6%') }]}>
                <TouchableOpacity style={styles.levelItem}>
                    <Icon name='diamond' size={RFValue(22)} color='#9747FF' />
                    <Text style={styles.levelText}>Level: 5{'\n'}(Silver)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.levelItem}>
                    <Text style={styles.levelEmoji}>🏆</Text>
                    <Text style={styles.levelText}>Total{'\n'}Wins: ₹560</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.levelItem}>
                    <Icon name='radar' size={RFValue(22)} color='#DB0004' />
                    <Text style={styles.levelText}>Spin Left{'\n'}Today: 2/5</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ProfileScreenUpperside;

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profileUppersideContainer: {
        backgroundColor: '#34A853',
        paddingBottom: hp('5%'),
    },
    IconMainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: wp('5%'),
        marginVertical: hp('4%'),
    },
    IconSubContainer: {
        flexDirection: 'row',
        gap: wp('2%'),
    },
    profileImageAndTextContainer: {
        alignItems: 'center',
        marginTop: hp('2%'),
    },
    profileImageContainer: {
        width: wp('25%'),
        height: wp('25%'),
        borderRadius: wp('12.5%'),
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
    },
    profileName: {
        fontSize: RFValue(24),
        fontWeight: '400',
        color: '#fff',
        marginTop: hp('1%'),
    },
    balanceBox: {
        marginTop: hp('2%'),
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('3%'),
        borderRadius: 4,
        minWidth: wp('35%'),
        alignItems: 'center',
    },
    BalanceText: {
        color: '#fff',
        fontSize: RFValue(14),
        fontWeight: '300',
    },
    doubleArrowIcon: {
        marginVertical: hp('1.5%'),
    },
    depositAndWithdrawContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp('2%'),
    },
    depositTextBox: {
        flex: 1,
        paddingVertical: hp('2%'),
        alignItems: 'center',
    },
    depositLeft: {
        backgroundColor: '#0653D1',
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
    },
    depositRight: {
        backgroundColor: '#FDBE00',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
    },
    depositText: {
        fontSize: RFValue(14),
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center',
    },
    rulesText: {
        fontSize: RFValue(8),
    },
    levelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: hp('2%'),
    },
    levelItem: {
        backgroundColor: '#fff',
        padding: hp('1.5%'),
        borderRadius: 20,
        width: wp('20%'),
        alignItems: 'center',
        elevation: 6,
    },
    levelEmoji: {
        fontSize: RFValue(22),
    },
    levelText: {
        fontSize: RFValue(10),
        fontWeight: '400',
        textAlign: 'center',
    },
});

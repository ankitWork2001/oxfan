import {
    Alert,
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserDetails } from '../store/features/auth/authThunk';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppDispatch } from '../store/store';
import Clipboard from '@react-native-clipboard/clipboard';
import { fetchReferralCode } from '../store/features/refferal/refferalThunk';

const PersonalDetails = () => {
    const navigation = useNavigation();
    const { height, width } = Dimensions.get('window');
    const dispatch = useDispatch<AppDispatch>();
    // const { user } = useSelector(state => state.auth);
    const { basicUser, userDetails } = useSelector(state => state.auth);
    const { token } = useSelector(state => state.auth);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [mobile, setMobile] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        if (basicUser?._id && !userDetails) {
            dispatch(getUserDetails(basicUser._id));
        } else if (userDetails) {
            setName(userDetails.name || '');
            setEmail(userDetails.email || '');
            setMobile(userDetails.mobile || '');
            setGender(userDetails.gender || '');
            setDob(userDetails.dob ? new Date(userDetails.dob) : new Date());
        }

        dispatch(fetchReferralCode())
            .unwrap()
            .then((data) => {
                console.log('🎯 Referral code data:', data);
                setReferralCode(data.code);
            })
            .catch((error) => {
                console.error('❌ Error fetching referral code:', error);
            });
    }, [basicUser, userDetails]);

    if (!userDetails) {
        return (
            <SafeAreaView style={styles.MainContainer}>
                <Text style={{ textAlign: 'center', marginTop: 50 }}>Loading user details...</Text>
            </SafeAreaView>
        );
    }

    const onChangeDate = (event, selectedDate) => {
        setShowPicker(Platform.OS === 'ios'); // iOS shows it always, Android closes on select
        if (selectedDate) {
            setDob(selectedDate);
        }
    };

    const handleSave = () => {
        const payload = {
            _id: userDetails._id,
            name,
            email,
            mobile,
            gender,
            dob: dob.toISOString(),
        };
        console.log('Sending update payload:', payload);
        console.log('Using token:', token);


        dispatch(updateUserDetails({ data: payload, token }))
            .unwrap()
            .then((res) => {
                console.log('✅ Update successful:', res);
                Alert.alert('Success', 'Profile updated successfully!');
            })
            .catch((err) => {
                console.error('❌ Update failed:', err);
                Alert.alert('Error', 'Failed to update profile. Please try again.');
            });
    };


    const copyToClipboard = () => {
        Clipboard.setString(referralCode);
        ToastAndroid.show('Copied to Clipboard!', ToastAndroid.SHORT); // For Android feedback
    };

    return (
        <SafeAreaView style={styles.MainContainer}>
            <ScrollView>
                <View style={styles.headerContentContainer}>
                    <View style={styles.headerTextContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" size={20} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Personal Details</Text>
                    </View>
                    <View style={styles.IconSubContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                            <Icon name="settings" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.profileImageAndTextContainer}>
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
                    <TouchableOpacity
                        style={[styles.carmeraIcon, { right: width * 0.08, top: height * 0.07 }]}
                    >
                        <Icon name="add-a-photo" size={14} />
                    </TouchableOpacity>
                    <View style={{ right: width * 0.04 }}>
                        <Text style={styles.UserIdText}>UserName</Text>
                        <Text style={styles.IdText}>{userDetails.username}</Text>
                    </View>
                </View>

                <View style={styles.inputsMainContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} editable />

                    <Text style={styles.label}>Date Of Birth</Text>
                    <TouchableOpacity
                        style={styles.dateInput}
                        onPress={() => setShowPicker(true)}
                    >
                        <Text style={styles.dateText}>
                            {dob.toDateString()}
                        </Text>
                        <Icon name="calendar-today" size={20} color="#4CAF50" />
                    </TouchableOpacity>

                    {showPicker && (
                        <DateTimePicker
                            value={dob}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                            maximumDate={new Date()} // Optional: prevent future dates
                        />
                    )}

                    <Text style={styles.label}>Gender</Text>
                    <View style={styles.genderContainer}>
                        <TouchableOpacity
                            style={[styles.genderButton, gender === 'male' && styles.genderSelected]}
                            onPress={() => setGender('male')}
                        >
                            <Text style={[styles.genderText, gender === 'male' && styles.selectedText]}>Male</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.genderButton, gender === 'female' && styles.genderSelected]}
                            onPress={() => setGender('female')}
                        >
                            <Text style={[styles.genderText, gender === 'female' && styles.selectedText]}>Female</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>E-Mail</Text>
                    <TextInput style={styles.input} value={email} onChangeText={setEmail} editable />

                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput style={styles.input} value={mobile} onChangeText={setMobile} editable />

                    <Text style={styles.label}>Referral Code</Text>
                    <View style={styles.referralContainer}>
                        <TextInput style={styles.referralInput} value={referralCode} editable={false} />
                        <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
                            <Text style={styles.copyText}>Copy</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.verifiedButton} onPress={handleSave}>
                        <Text style={styles.verifiedText}>Save Account</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PersonalDetails;

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#34A853',
        paddingVertical: 30,
        paddingHorizontal: 30,
    },
    headerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    headerText: {
        fontSize: RFValue(20),
        fontWeight: '500',
        color: '#fff',
    },
    IconSubContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    profileImageAndTextContainer: {
        flexDirection: 'row',
        // justifyContent: 'flex-start',
        marginHorizontal: 25,
        marginTop: 25,
    },
    profileImageContainer: {
        width: 90,
        height: 78,
        borderRadius: 50,
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',

    },
    // Image: {
    //     resizeMode: 'contain',
    // },
    carmeraIcon: {
        backgroundColor: '#FFFFFF',
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        borderRadius: 50,
    },
    UserIdText: {
        fontSize: RFValue(12),
        fontWeight: '500',
        color: '#8F8F8F',
        marginTop: 10,
    },
    IdText: {
        fontSize: RFValue(10),
        fontWeight: '500',
        color: '#000',
    },
    inputsMainContainer: {
        padding: 20,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#999',
        marginBottom: 5,
        marginTop: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 12,
        color: '#000',
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        color: '#000',
    },
    genderContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 5,
    },
    genderButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 6,
    },
    genderSelected: {
        backgroundColor: '#3D5AFE',
        borderColor: '#3D5AFE',
    },
    genderText: {
        color: '#000',
    },
    selectedText: {
        color: '#fff',
        fontWeight: '600',
    },
    referralContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    referralInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 12,
        color: '#000',
    },
    copyButton: {
        backgroundColor: '#FFA500',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 6,
    },
    copyText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    verifiedButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 6,
        marginTop: 30,
        alignItems: 'center',
    },
    verifiedText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Dimensions,
    Image,
    Alert,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { signInUser } from '../store/features/auth/authThunk';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const SignInScreen: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [mobile, setMobile] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState(false); // Add loading state
    const dispatch = useDispatch<AppDispatch>();
    const { error } = useSelector((state: RootState) => state.auth);
    const navigation = useNavigation<NavigationProp<any>>();

    const handleSignin = async () => {
        if (!name || !email || !password || !mobile) {
            return Alert.alert('Error', 'Please enter all credentials');
        }
        console.log("Signing in with:", { username, name, email, password, mobile }); // Debugging log
        setLoading(true);
        try {
            // Use unwrap to get the result or throw an error
            await dispatch(signInUser({ username, name, email, password, mobile })).unwrap();
            navigation.navigate('Login');
            Alert.alert('SignUp Successfull');
        } catch (err) {
            console.error("Sign In Error:", err); // Log the error for debugging
            Alert.alert("Sign Up Failed", err.message || 'Sign Up failed');
        } finally {
            setLoading(false);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <SafeAreaView>
                    <View style={styles.mainContainer}>
                        <Image
                            source={require('../assests/loginSiginBacckgroundImage.png')}
                            style={styles.image}
                        />
                        <Image
                            style={[styles.image, { top: height * -0.45 }]}
                            source={require('../assests/leftCoins.png')}
                        />
                        <Image
                            style={[styles.image, { top: height * -0.75, left: width * 0.4 }]}
                            source={require('../assests/rightCoins.png')}
                        />
                        <View style={[styles.loginAndCreateAccountContainer, { top: height * 0.09 }]}>
                            <View style={styles.loginArrowBackContain}>
                                <TouchableOpacity
                                    onPress={() => navigation.goBack()}
                                >
                                    <Icon
                                        style={styles.BackIcon}
                                        name="arrow-back"
                                        size={20}
                                        color="#000000"
                                    />
                                </TouchableOpacity>
                                <Text style={styles.loginText}>Sign Up</Text>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>

                <View style={styles.body}>
                    <Text style={styles.welcomeText}>Welcome!</Text>

                    <Text style={styles.label}>User Name</Text>
                    <TextInput
                        placeholder="username"
                        onChangeText={setUsername}
                        value={username}
                        style={styles.input}
                        autoCapitalize="words"
                    />

                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        placeholder="Name"
                        onChangeText={setName}
                        value={name}
                        style={styles.input}
                        autoCapitalize="words"
                    />

                    <Text style={styles.label}>E-Mail Address</Text>
                    <TextInput
                        placeholder="Email"
                        onChangeText={setEmail}
                        value={email}
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <Text style={styles.label}>Mobile</Text>
                    <TextInput
                        placeholder="Mobile"
                        onChangeText={setMobile}
                        value={mobile}
                        style={styles.input}
                        keyboardType="number-pad"
                    />

                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            onChangeText={setPassword}
                            value={password}
                            style={styles.inputPassword}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(prev => !prev)}
                        >
                            <Icon
                                style={[styles.icon, { right: width * 0.01, top: height * 0.008 }]}
                                name={showPassword ? "visibility-off" : "visibility"}
                                size={18}
                                color="#000"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSignin} style={styles.loginButton} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.loginButtonText}>Sign Up</Text>
                        )}
                    </TouchableOpacity>

                    <Text style={styles.orText}>Or</Text>

                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.loginWith}>Log In With</Text>
                        <View style={styles.divider} />
                    </View>

                    <View style={styles.socialIconContainer}>
                        <TouchableOpacity style={styles.button}>
                            <Image
                                style={styles.socialIcon}
                                source={require('../assests/googleLogo.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Image
                                style={styles.socialIcon}
                                source={require('../assests/appleLogo.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Image
                                style={styles.socialIcon}
                                source={require('../assests/facebookLogo.png')}
                            />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.signUpPrompt}>
                        Already Have an Account?
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.signInLink}> Log In</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignInScreen;


const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: Dimensions.get("window").height * 0.35,
        position: 'relative',
    },
    image: {
        resizeMode: 'contain',
    },
    loginAndCreateAccountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        width: "100%",
        paddingHorizontal: 20
    },
    loginArrowBackContain: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    BackIcon: {
        fontSize: RFValue(22),
        color: "#FFFFFF"
    },
    loginText: {
        fontSize: RFValue(20),
        fontWeight: '400',
        color: "#FFFFFF"
    },
    container: {
        backgroundColor: '#fff',
    },
    body: {
        padding: 30,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: -100
    },
    welcomeText: {
        fontSize: RFValue(20),
        fontWeight: 'bold',
        color: '#FF8800',
        marginBottom: 15,
    },
    label: {
        fontSize: RFValue(16),
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 15
    },
    passwordContainer: {
        flexDirection: 'row',
    },
    inputPassword: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 15,
        flex: 1,
        color: '#000'
    },
    icon: {
        position: 'absolute',
    },
    forgotPassword: {
        alignItems: 'flex-end',
        marginVertical: 5,
    },
    forgotPasswordText: {
        fontSize: RFValue(10),
        color: '#555',
    },
    loginButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 30
    },
    loginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: RFValue(14),
        fontWeight: '400'
    },
    orText: {
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 10,
        fontSize: RFValue(12),
        fontWeight: '600',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    loginWith: {
        marginHorizontal: 10,
        fontSize: RFValue(12),
        color: '#888',
    },
    socialIconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        marginTop: 20
    },
    button: {
        backgroundColor: "#E7E7E7",
        padding: 10,
        borderRadius: 7
    },
    socialIcon: {
        width: 35,
        height: 35,
        resizeMode: 'contain',
    },
    signUpPrompt: {
        marginTop: 60,
        marginBottom: 20,
        textAlign: 'center',
        fontSize: RFValue(12),
        color: '#000',
    },
    signInLink: {
        color: "green",
        fontWeight: '600'
    }
});

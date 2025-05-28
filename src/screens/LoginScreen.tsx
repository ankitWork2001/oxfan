import {
  Dimensions, Image, SafeAreaView, StyleSheet, Text, TextInput,
  TouchableOpacity, View, ActivityIndicator, Alert
} from 'react-native';
import React, { useState } from 'react';
import SignInLoginHeadPart from '../components/SignInLoginHeadPart';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { loginUser } from '../store/features/auth/authThunk';

export default function LoginScreen() {
  const { height, width } = Dimensions.get('window');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useDispatch<AppDispatch>();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!emailOrPhone || !password) {
      Alert.alert("Validation Error", "Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(loginUser({ email: emailOrPhone, password }, navigation));
      Alert.alert('Login Successful');
    } catch (error) {
      Alert.alert("Login Failed", error?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <SignInLoginHeadPart />
      <View style={styles.body}>
        <Text style={styles.welcomeText}>Welcome Back!</Text>

        <Text style={styles.label}>E-Mail Address / Phone Number</Text>
        <TextInput
          style={styles.input}
          value={emailOrPhone}
          onChangeText={setEmailOrPhone}
          placeholder="Enter email or phone"
          keyboardType="default"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            secureTextEntry={!showPassword}
            style={styles.inputPassword}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowPassword(prev => !prev)}
          >
            <Icon
              name={showPassword ? "visibility-off" : "visibility"}
              size={20}
              color="#000"
              style={{ right: width * 0.02, top: height * 0.008 }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Log In</Text>
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
            <Image style={styles.socialIcon} source={require('../assests/googleLogo.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image style={styles.socialIcon} source={require('../assests/appleLogo.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image style={styles.socialIcon} source={require('../assests/facebookLogo.png')} />
          </TouchableOpacity>
        </View>

        <Text style={styles.signUpPrompt}>Don't Have An Account ?
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signInLink}>  Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15
  },
  passwordContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  inputPassword: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
    width: "100%",
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

import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ProfileScreenUpperside from '../components/ProfileScreenUpperside';
import ProfileScreenDownrside from '../components/ProfileScreenDownrside';



const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);

  const { height } = Dimensions.get('window');
 



  return (
    <SafeAreaView style={styles.MainContainer}>
      {user ? (
        <ScrollView
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        >
          <ProfileScreenUpperside />
          <ProfileScreenDownrside />
        </ScrollView>
      ) : (
        <View style={styles.centered}>
          <Text style={styles.promptText}>
            You are not logged in.
          </Text>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>Login Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  promptText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#444',
    marginTop: 20,
    textAlign: 'center',
  },
  loginBtn: {
    marginTop: 20,
    backgroundColor: '#FF8800',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import AdminTemplateHeaderPart from '../components/AdminTemplateHeaderPart';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../store/features/adminUsers/adminUsersThunk'; // Adjust path if needed
import { AppDispatch, RootState } from '../store/store';
import { getUserDetails } from '../store/features/auth/authThunk';
import { useNavigation } from '@react-navigation/native';

const columnWidths = {
  userId: 100,
  name: 100,
  email: 200,
  balance: 120,
  status: 100,
  actions: 200,
};

const UsersScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const { users, loading, error } = useSelector((state: RootState) => state.adminAllUser);
  const { basicUser, userDetails } = useSelector(state => state.auth);


  useEffect(() => {
    if (token) {
      console.log("Token found, fetching investments");
      dispatch(fetchAllUsers())
        .unwrap()
        .then((data) => {
          console.log('fetchUser successful')
          console.log('Fetched data:', data);
        })
        .catch((err) => console.error('fetchUser failed:', err));
    } else {
      console.log("No token available yet, skipping fetch");
    }

    if (basicUser?._id && !userDetails) {
      dispatch(getUserDetails(basicUser._id));
    }
  }, [dispatch, userDetails, basicUser]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <AdminTemplateHeaderPart name='Users' paddingBottom={20} />
        <View style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="#4CAF50" />
          ) : error ? (
            <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.HorizentalScrollContainer}
            >
              <View style={styles.TableContainer}>
                <View style={[styles.row, styles.headerRow]}>
                  <Text style={[styles.headerCell, { width: columnWidths.userId }]}>User ID</Text>
                  <Text style={[styles.headerCell, { width: columnWidths.name }]}>Name</Text>
                  <Text style={[styles.headerCell, { width: columnWidths.email }]}>E-Mail</Text>
                  <Text style={[styles.headerCell, { width: columnWidths.balance }]}>Wallet Balance</Text>
                  <Text style={[styles.headerCell, { width: columnWidths.status }]}>Status</Text>
                  <Text style={[styles.headerCell, { width: columnWidths.actions }]}>Actions</Text>
                </View>

                {users.map((user, index) => (
                  <View style={styles.row} key={user._id || index}>
                    <Text style={[styles.cell, { width: columnWidths.userId }]}>{user.username}</Text>
                    <Text style={[styles.cell, { width: columnWidths.name }]}>{user.name}</Text>
                    <Text style={[styles.cell, { width: columnWidths.email }]}>{user.email}</Text>
                    <Text style={[styles.cell, { width: columnWidths.balance }]}>
                      {userDetails?._id === user._id ? userDetails.wallet?.balance ?? 'N/A' : 'N/A'}
                    </Text>
                    <Text style={[styles.cell, { width: columnWidths.status }]}>{user.status}</Text>
                    <View style={[styles.cell, { width: columnWidths.actions, flexDirection: 'row' }]}>
                      <TouchableOpacity onPress={() => navigation.navigate('UserView',{ user })}>
                        <Text style={styles.link}>View</Text>
                      </TouchableOpacity>
                      <Text style={[styles.link, { color: '#E5A400' }]}>Suspend</Text>
                      <Text style={styles.reject}>Reject</Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#F3F3F3",
    margin: 10,
    borderRadius: 6,
  },
  HorizentalScrollContainer: {
    backgroundColor: '#fff',
  },
  TableContainer: {},
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  headerRow: {
    backgroundColor: '#4CAF50',
  },
  headerCell: {
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 10,
  },
  cell: {
    paddingHorizontal: 10,
  },
  link: {
    color: 'blue',
    marginRight: 10,
    textDecorationLine: 'underline',
  },
  reject: {
    color: 'red',
    textDecorationLine: 'underline',
  },
});
import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import AdminTemplateHeaderPart from '../components/AdminTemplateHeaderPart'
import { RFValue } from 'react-native-responsive-fontsize'
import { TextInput } from 'react-native-gesture-handler'

const users = new Array(8).fill({
  userId: 'UU01',
  name: 'Aman',
  email: 'Amandeep@Gmail.Com',
  balance: 'Rs.500',
  status: 'Active'
})

const columnWidths = {
  userId: 80,
  name: 100,
  email: 200,
  balance: 120,
  status: 100,
  actions: 200,
}

const UsersScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <AdminTemplateHeaderPart />
        <View style={styles.container}>
          <Text style={styles.headerText}>Users</Text>

          <TextInput
            style={styles.searchInput}
            placeholderTextColor='black'
            placeholder="Search users..."
          />
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
                <View style={styles.row} key={index}>
                  <Text style={[styles.cell, { width: columnWidths.userId }]}>{user.userId}</Text>
                  <Text style={[styles.cell, { width: columnWidths.name }]}>{user.name}</Text>
                  <Text style={[styles.cell, { width: columnWidths.email }]}>{user.email}</Text>
                  <Text style={[styles.cell, { width: columnWidths.balance }]}>{user.balance}</Text>
                  <Text style={[styles.cell, { width: columnWidths.status }]}>{user.status}</Text>
                  <View style={[styles.cell, { width: columnWidths.actions, flexDirection: 'row' }]}>
                    <Text style={styles.link}>View</Text>
                    <Text style={[styles.link, { color: '#E5A400' }]}>Suspend</Text>
                    <Text style={styles.reject}>Reject</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default UsersScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#F3F3F3",
    margin: 10,
    borderRadius: 6
  },
  headerText: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  HorizentalScrollContainer: {
    backgroundColor: '#fff',
  },
  TableContainer: {

  },
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
    textDecorationLine: 'underline'
  },
  reject: {
    color: 'red',
    textDecorationLine: 'underline'
  },
})

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

const AdminTemplateHeaderPart = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation();
    const { height } = Dimensions.get('window');

    const handleNavigate = (screen) => {
        setMenuVisible(false);
        navigation.navigate(screen);
    };

    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Text style={styles.greetingText}>Hello Rohan,</Text>

                <View style={styles.iconGroup}>
                    <View style={styles.searchContainer}>
                        <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
                        <TextInput
                            placeholder="Search..."
                            style={styles.searchInput}
                            placeholderTextColor="#999"
                        />
                    </View>
                    <TouchableOpacity style={styles.iconButton}>
                        <Icon name="notifications" size={26} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={() => setMenuVisible(true)}>
                        <Icon name="menu" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Menu Modal */}
            <Modal transparent visible={menuVisible} animationType="fade">
                <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.menu}>
                                <TouchableOpacity onPress={() => handleNavigate('Home')}>
                                    <Text style={styles.menuItem}>Dashboard</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleNavigate('Users')}>
                                    <Text style={styles.menuItem}>Users</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleNavigate('Investments')}>
                                    <Text style={styles.menuItem}>Investments</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleNavigate('SpinLogs')}>
                                    <Text style={styles.menuItem}>Spin Logs</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleNavigate('Deposits')}>
                                    <Text style={styles.menuItem}>Deposits</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleNavigate('Withdrawals')}>
                                    <Text style={styles.menuItem}>Withdrawals</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleNavigate('Settings')}>
                                    <Text style={styles.menuItem}>Settings</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('Log Out')}>
                                    <Text style={styles.menuItem}>Log Out</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </SafeAreaView>
    );
};

export default AdminTemplateHeaderPart;

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#34A853',
        paddingHorizontal: 16,
        paddingVertical: 40,
    },
    greetingText: {
        fontSize: RFValue(20),
        color: '#fff',
        fontWeight: '400',
    },
    iconGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
        width: "76%",
    },
    searchIcon: {
        marginRight: 6,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#333',
        paddingVertical: 0,
    },
    iconButton: {
        marginLeft: 12,
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: 60,
        paddingRight: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    menu: {
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 16,
        borderRadius: 10,
        width: 200,
        elevation: 5,
    },
    menuItem: {
        fontSize: 16,
        paddingVertical: 10,
        color: '#333',
    },
});

import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    Modal,
    TouchableOpacity,
    View,
    SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AdminTemplateHeaderPart from '../components/AdminTemplateHeaderPart';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DashBoardScreen = () => {
    const inset = useSafeAreaInsets();
    const [depositFilter, setDepositFilter] = useState('Week');
    const [withdrawFilter, setWithdrawFilter] = useState('Week');
    const [dropdownVisible, setDropdownVisible] = useState(null); // 'deposit' | 'withdraw' | null

    const filterOptions = ['Day', 'Week', 'Month', 'Year'];
    return (
        <SafeAreaView>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[styles.scrollViewContent, { padding: inset.bottom }]}
            >
                <AdminTemplateHeaderPart />
                <View style={styles.dashboardWrapper}>
                    <Text style={styles.dashboardTitle}>Dashboard</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.horizontalScrollContainer}
                    >
                        <View style={[styles.ongoingDashboardCard, { backgroundColor: '#ACE6F1' }]}>

                            <View style={styles.cardContainer}>
                                <Icon
                                    name="group"
                                    size={45}
                                    color="#007A8A"
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.label}>Total Users</Text>
                                    <Text style={styles.value}>12,432</Text>
                                </View>
                            </View>


                            <Text><Text>●</Text> +153 new today</Text>
                            <Text><Text>●</Text> 9,204 active this week (74%)</Text>
                            <Text><Text>●</Text> ↑ 4.2% growth vs last week</Text>
                        </View>
                        <View style={[styles.ongoingDashboardCard, { backgroundColor: '#FBE7A1' }]}>
                            <View style={styles.cardContainer}>
                                <Icon name="upload" size={45} color="#D4A800" />
                                <View style={styles.textContainer}>
                                    <Text style={styles.label}>Total Deposits</Text>
                                    <Text style={styles.value}>$542,100</Text>
                                </View>
                            </View>
                            <Text>● +$12,300 today</Text>
                            <Text>● 1,823 successful deposits this week</Text>
                            <Text>● ↑ 6.7% growth vs last week</Text>
                        </View>
                        <View style={[styles.ongoingDashboardCard, { backgroundColor: '#E9D5FF' }]}>
                            <View style={styles.cardContainer}>
                                <Icon name="download" size={45} color="#8B5CF6" />
                                <View style={styles.textContainer}>
                                    <Text style={styles.label}>Total Withdraws</Text>
                                    <Text style={styles.value}>$342,100</Text>
                                </View>
                            </View>
                            <Text>● $8,100 withdrawn today</Text>
                            <Text>● Pending: $22,450</Text>
                            <Text>● ↓ 1.13% vs last week</Text>
                        </View>
                        <View style={[styles.ongoingDashboardCard, { backgroundColor: '#FBC6C6' }]}>
                            <View style={styles.cardContainer}>
                                <Icon name="group-add" size={45} color="#D94A4A" />
                                <View style={styles.textContainer}>
                                    <Text style={styles.label}>Total Referrals</Text>
                                    <Text style={styles.value}>2,100</Text>
                                </View>
                            </View>
                            <Text>● +78 new today</Text>
                            <Text>● 1,560 active referrers</Text>
                            <Text>● Top earner: User #1023 ($3,200)</Text>
                        </View>
                    </ScrollView>

                    <Text style={styles.SignupTrendText}>Signup Trend</Text>
                    <View style={styles.SignupTrendImageContainer}>
                        <Image
                            source={require('../assests/signUpTrendImage.png')}
                            style={styles.SignupTrendImage}
                        />
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#3366CC' }]}>
                            <Text style={styles.buttonText}>Approve Withdrawals</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, { backgroundColor: '#EA5C49' }]}>
                            <Text style={styles.buttonText}>Add New Investment Plan</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.button, { backgroundColor: '#007A8A' }]}>
                            <Text style={styles.buttonText}>View Today’s Activity</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.SignupTrendText}>Deposits</Text>
                            <TouchableOpacity
                                style={styles.dropdownButton}
                                onPress={() => setDropdownVisible(dropdownVisible === 'deposit' ? null : 'deposit')}
                            >
                                <Text>{depositFilter} ▼</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.SignupTrendImageContainer}>
                            <Image
                                source={require('../assests/DepositGraphImage.png')}
                                style={styles.SignupTrendImage}
                            />
                        </View>

                        <View style={styles.sectionHeader}>
                            <Text style={styles.SignupTrendText}>Withdrawals</Text>
                            <TouchableOpacity
                                style={styles.dropdownButton}
                                onPress={() => setDropdownVisible(dropdownVisible === 'withdraw' ? null : 'withdraw')}
                            >
                                <Text>{withdrawFilter} ▼</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.SignupTrendImageContainer}>
                            <Image
                                source={require('../assests/WithdrawalGraphImage.png')}
                                style={styles.SignupTrendImage}
                            />
                        </View>

                        {dropdownVisible && (
                            <Modal transparent animationType="fade" visible={true} onRequestClose={() => setDropdownVisible(null)}>
                                <TouchableOpacity
                                    style={styles.modalOverlay}
                                    onPress={() => setDropdownVisible(null)}
                                    activeOpacity={1}
                                >
                                    <View style={styles.dropdown}>
                                        {filterOptions.map((option, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                style={styles.option}
                                                onPress={() => {
                                                    if (dropdownVisible === 'deposit') setDepositFilter(option);
                                                    else if (dropdownVisible === 'withdraw') setWithdrawFilter(option);
                                                    setDropdownVisible(null);
                                                }}
                                            >
                                                <Text>{option}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </TouchableOpacity>
                            </Modal>
                        )}
                    </View>
                </View>
            </ScrollView >
        </SafeAreaView>
    );
};

export default DashBoardScreen;

const styles = StyleSheet.create({
    scrollViewContent: {
        backgroundColor: '#fff',
    },
    dashboardWrapper: {
        paddingHorizontal: 16,
        backgroundColor: '#F3F3F3',
        padding: 30,
        margin: 20,
        borderRadius: 6
    },
    dashboardTitle: {
        fontSize: RFValue(18),
        fontWeight: 'bold',
    },
    SignupTrendText: {
        fontSize: RFValue(18),
        fontWeight: 'bold',
        marginTop: 40
    },
    horizontalScrollContainer: {

    },
    ongoingDashboardCard: {
        width: 203,
        borderRadius: 6,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowRadius: 4,
        elevation: 5,
        shadowColor: '#000',
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        color: '#000',
        fontSize: RFValue(12),
        fontWeight: 400
    },
    value: {
        color: '#000',
        fontSize: RFValue(18),
        fontWeight: 400
    },
    SignupTrendImageContainer: {
        backgroundColor: "#fff",
        width: Dimensions.get('window').width * 0.8,
        height: 190,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    SignupTrendImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    buttonRow: {
        padding: 16,
        backgroundColor: '#F5F5F5',
        gap: 20
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        minWidth: Dimensions.get('window').width / 3 - 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 14,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 40,
    },

    dropdownButton: {
        width: 71,
        height: 24,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        backgroundColor: '#fff',
        marginTop: 35
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },

    dropdown: {
        width: 120,
        backgroundColor: '#fff',
        borderRadius: 6,
        paddingVertical: 6,
        elevation: 5,
        marginTop: 60,
    },

    option: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
    },
});

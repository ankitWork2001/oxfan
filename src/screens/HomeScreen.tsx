import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const HomeScreen = () => {
    const { height, width } = Dimensions.get('window');
    const insets = useSafeAreaInsets();
    return (
        <ScrollView contentContainerStyle={[styles.scrollViewContent, { paddingBottom: insets.bottom + 100 }]}>
            <SafeAreaView>
                <View>
                    <View style={styles.ImageContainer}>
                        <Image
                            source={require('../assests/homePageBackgroundImage.png')}
                            style={styles.backgroundImage}
                            resizeMode="contain"
                        />
                        <Image
                            source={require('../assests/homePageWomenImage.png')}
                            resizeMode="contain"
                            style={[styles.womenImage, { bottom: height * 0.03, right: width * 0 }]}
                        />
                    </View>
                    <View style={[styles.headerContent, { top: height * 0.055, left: width * 0.06 }]}>
                        <Text style={styles.welcomeText}>Welcome, Rohan!</Text>
                        <Text style={styles.subText}>Get Ready To Spin</Text>
                        <View style={styles.balanceBox}>
                            <Text style={styles.balanceText}>Rs.3500.45 Balance</Text>
                        </View>
                    </View>
                    <View style={styles.IconContaineer}>
                        <TouchableOpacity>
                            <Image
                                source={require('../assests/homePageDepositeIcon.png')}
                                style={[styles.Icon, { bottom: height * 0.055, left: width * 0 }]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require('../assests/homePageWithdrawIcon.png')}
                                style={[styles.Icon, { bottom: height * 0.08, left: width * 0 }]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require('../assests/homePageSpinIcon.png')}
                                style={[styles.Icon, { bottom: height * 0.055 }]}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryItem}>
                            <Text style={styles.label}>Today's Earnings</Text>
                            <Text style={[styles.value, { color: '#007BFF' }]}>₹120</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.summaryItem}>
                            <Text style={styles.label}>Balance</Text>
                            <Text style={[styles.value, { color: '#fbc02d' }]}>₹3500.45</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.summaryItem}>
                            <Text style={styles.label}>Frozen Amount</Text>
                            <Text style={[styles.value, { color: 'red' }]}>0</Text>
                        </View>
                    </View>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Today</Text>
                        <Text style={styles.seeAll}>See All</Text>
                    </View>

                    <View style={styles.todayCard}>
                        <View style={styles.todayRow}>
                            <View>
                                <Icon name='radar' size={30} color='red' />
                            </View>
                            <View>
                                <Text style={styles.todayLabel}>Latest Spin Reward</Text>
                                <Text>Rs.500</Text>
                            </View>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.todayRow}>
                            <View>
                                <Icon name='attach-money' size={30} color='skyblue' />
                            </View>
                            <View>

                                
                                <Text style={styles.todayLabel}>Active Investment</Text>
                                <Text>Gold Plan | 2.5% Daily | Active</Text>
                            </View>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.todayRow}>
                            <View>
                                <Icon name='schedule' size={30} color='lightgreen' />
                            </View>
                            <View>
                                <Text style={styles.todayLabel}>Next Payout</Text>
                                <Text>12:45:30</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.recentTitle}>Recent Activity</Text>
                    <View>
                        <View style={styles.recentContainer}>
                            <View style={styles.recentCard}>
                                <View style={styles.activityTextContainer}>
                                    <Text style={styles.recentText}>Deposited{"\n"}Rs.500</Text>
                                    <Text style={styles.recentTime}>2h Ago</Text>
                                </View>
                                <View>
                                    <Image
                                        source={require('../assests/homepageDepositedImage.png')}
                                        resizeMode='contain'
                                    />
                                </View>
                            </View>
                            <View style={styles.recentCard}>
                                <View style={styles.activityTextContainer}>
                                    <Text style={styles.recentText}>Spin & Win{"\n"}Rs.100</Text>
                                    <Text style={styles.recentTime}>2h Ago</Text>
                                </View>
                                <View>
                                    <Image
                                        source={require('../assests/homepageSipnAndWinImage.png')}
                                        resizeMode='contain'
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.recentTitle}>Play and Win Gift Hampers</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.horizontalScrollContainer}
                    >
                        <View style={styles.card}>
                            <Image source={require('../assests/homepageBigWinImage.png')} style={styles.cardImage} />
                            <TouchableOpacity style={[styles.playButton, { top: height * 0.11, left: width * 0.13 }]}>
                                <Text style={styles.playButtonText}>Play Now</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.card}>
                            <Image source={require('../assests/homepageGirlScrollImage.png')} style={styles.cardImage} />
                            <TouchableOpacity style={[styles.playButton, { top: height * 0.11, left: width * 0.13 }]}>
                                <Text style={styles.playButtonText}>Play Now</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.card}>
                            <Image source={require('../assests/homepageLuckySpinImage.png')} style={styles.cardImage} />
                            <TouchableOpacity style={[styles.playButton, { top: height * 0.11, left: width * 0.13 }]}>
                                <Text style={styles.playButtonText}>Play Now</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    ImageContainer: {
        position: 'relative',
        justifyContent: 'center',
    },
    backgroundImage: {
        resizeMode: 'cover',
    },
    womenImage: {
        position: 'absolute',
    },
    headerContent: {
        position: 'absolute',
    },
    welcomeText: {
        color: '#fff',
        fontSize: RFValue(26),
        fontWeight: 500,
    },
    subText: {
        color: '#fff',
        fontSize: 14,
        marginTop: 5,
        fontWeight: 200
    },
    balanceBox: {
        marginTop: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        paddingVertical: 8,
        paddingHorizontal: 1,
        borderRadius: 4,
        width: 130
    },
    balanceText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 300,
    },
    IconContaineer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        gap: 30
    },
    Icon: {
        resizeMode: 'contain'
    },
    summaryCard: {
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginTop: 16,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    summaryItem: {
        alignItems: 'center',
        flex: 1,
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 6,
    },
    value: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: '#e0e0e0',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    seeAll: {
        color: 'green',
        fontWeight: '500',
    },
    todayCard: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        elevation: 4,
    },
    todayRow: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
        marginBottom: 12
    },
    todayLabel: {
        fontWeight: '600',
        fontSize: RFValue(14)
    },
    separator: {
        borderBottomWidth: 1,
        borderColor: '#eee',
        marginVertical: 6,
    },
    recentTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 16,
        marginTop: 24,
    },
    recentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 12,
    },
    recentCard: {
        width: 180,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: 20
    },
    activityTextContainer: {

    },
    recentText: {
        fontWeight: '500',
        marginBottom: 20,
    },
    recentTime: {
        fontSize: 12,
        color: '#888',
    },
    horizontalScrollContainer: {},
    card: {
        marginTop: 20,
        marginRight: 15,
        marginLeft: 20,
        width: 192,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 3,
    },
    cardImage: {
        width: '100%',
        height: 133,
        resizeMode: 'cover',
    },
    playButton: {
        backgroundColor: '#34A853',
        paddingVertical: 10,
        width: 100,
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 6
    },
    playButtonText: {
        color: '#fff',
        fontSize: 8,
        fontWeight: 600,
    },
});

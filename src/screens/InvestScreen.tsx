import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import Slider from '@react-native-community/slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveInvestments, getPlans } from '../store/features/investment/investmentThunk';
import { AppDispatch, RootState } from '../store/store';

const InvestScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();

  const { activeInvestments, investmentPlans, plansLoading, plansError } = useSelector(
    (state: RootState) => state.investment
  );

  useEffect(() => {
    dispatch(fetchActiveInvestments())
      .unwrap()
      .then((res) => {
        console.log('Fetched Active Investments:', res);
      })
      .catch((err) => {
        console.log('Error fetching investments:', err);
      });

    dispatch(getPlans())
      .unwrap()
      .then((res) => {
        console.log('Fetched Plans:', res);
      })
      .catch((err) => {
        console.log('Error fetching plans:', err);
      });
  }, [dispatch]);


  return (
    <SafeAreaView style={styles.MainContainer}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingTop: insets.top }}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Choose Your Investment Plan</Text>
            <TouchableOpacity>
              <Icon name='notifications' size={20} color='#fff' />
            </TouchableOpacity>
          </View>
          {plansLoading ? (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading plans...</Text>
          ) : plansError ? (
            <Text style={{ textAlign: 'center', color: 'red', marginTop: 20 }}>{plansError}</Text>
          ) : Array.isArray(investmentPlans) && investmentPlans.length > 0 ? (
            investmentPlans.map((plan, index) => {
              const planNameLower = plan.name?.toLowerCase() || '';

              const planColor =
                planNameLower.includes('gold') ? '#FDBE00' :
                  planNameLower.includes('premium') ? '#9747FF' :
                    planNameLower.includes('starter') ? '#0077FF' :
                      '#2E7D32'; // default color

              const planImage =
                planNameLower.includes('gold') ? require('../assests/InvetManGoldPlanImage.png') :
                  planNameLower.includes('premium') ? require('../assests/InvetManPremiumPlanImage.png') :
                    planNameLower.includes('starter') ? require('../assests/investMan.png') :
                      require('../assests/investMan.png'); // default image

              return (
                <View key={plan._id || index} style={styles.card}>
                  <View style={[styles.borderBar, { backgroundColor: planColor }]} />
                  <View style={styles.content}>
                    <View style={styles.textSection}>
                      <View style={styles.titleRow}>
                        <Icon name="schedule" size={14} color={planColor} />
                        <Text style={styles.title}> {plan.name}</Text>
                      </View>
                      <Text style={styles.text}>ROI: {plan.roiPercent}%</Text>
                      <Text style={styles.text}>Min Amount: ₹{plan.minAmount}</Text>
                      <Text style={styles.text}>Duration: {plan.durationDays} Days</Text>
                      <Text style={styles.text}>Payout: {plan.autoPayout ? 'Auto' : 'Manual'}</Text>
                    </View>
                    <View style={styles.imageContainer}>
                      <Image source={planImage} style={styles.image} resizeMode="contain" />
                    </View>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: planColor }]}>
                      <Text style={styles.buttonText}>Invest Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No investment plans found.</Text>
          )}


          <Text style={styles.investmentHeaderText}>Ongoing Investments</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScrollContainer}
          >
            <View style={[styles.ongoingInvestmentCard, { backgroundColor: '#0077FFD9' }]}>
              <View style={styles.headerRow}>
                <Icon name="schedule" size={14} color="#fff" />
                <Text style={styles.planTitle}> Basic Plan</Text>
              </View>

              <Text style={styles.label}>Progress</Text>

              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={0.4}
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="#444"
                thumbTintColor="#fff"
              />

              <Text style={styles.detail}>Invested: ₹3000</Text>
              <Text style={styles.detail}>Earnings: ₹225</Text>
              <Text style={styles.detail}>Next Payout: May 10, 2025</Text>
              <Text style={styles.detail}>End Date: Jun 25, 2025</Text>
            </View>
            <View style={[styles.ongoingInvestmentCard, { backgroundColor: '#FDBE00D9' }]}>
              <View style={styles.headerRow}>
                <Icon name="schedule" size={14} color="#fff" />
                <Text style={styles.planTitle}> Gold Plan</Text>
              </View>

              <Text style={styles.label}>Progress</Text>

              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={0.6}
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="#444"
                thumbTintColor="#fff"
              />

              <Text style={styles.detail}>Invested: ₹3000</Text>
              <Text style={styles.detail}>Earnings: ₹225</Text>
              <Text style={styles.detail}>Next Payout: May 10, 2025</Text>
              <Text style={styles.detail}>End Date: Jun 25, 2025</Text>
            </View>
            <View style={[styles.ongoingInvestmentCard, { backgroundColor: '#0077FFD9' }]}>
              <View style={styles.headerRow}>
                <Icon name="schedule" size={14} color="#fff" />
                <Text style={styles.planTitle}> Basic Plan</Text>
              </View>

              <Text style={styles.label}>Progress</Text>

              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={0.4}
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="#444"
                thumbTintColor="#fff"
              />

              <Text style={styles.detail}>Invested: ₹3000</Text>
              <Text style={styles.detail}>Earnings: ₹225</Text>
              <Text style={styles.detail}>Next Payout: May 10, 2025</Text>
              <Text style={styles.detail}>End Date: Jun 25, 2025</Text>
            </View>
            <View style={[styles.ongoingInvestmentCard, { backgroundColor: '#FDBE00D9' }]}>
              <View style={styles.headerRow}>
                <Icon name="schedule" size={14} color="#fff" />
                <Text style={styles.planTitle}> Gold Plan</Text>
              </View>

              <Text style={styles.label}>Progress</Text>

              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={0.4}
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="#444"
                thumbTintColor="#fff"
              />

              <Text style={styles.detail}>Invested: ₹3000</Text>
              <Text style={styles.detail}>Earnings: ₹225</Text>
              <Text style={styles.detail}>Next Payout: May 10, 2025</Text>
              <Text style={styles.detail}>End Date: Jun 25, 2025</Text>
            </View>
          </ScrollView>
          <Text style={styles.investmentHeaderText}>Past  Investment</Text>
          <View style={styles.InvestmentTablecontainer}>
            <View style={styles.InvestmentTableheaderRow}>
              <Text style={styles.InvestmentTableheaderText}>Plan Type</Text>
              <Text style={styles.InvestmentTableheaderText}>Amount</Text>
              <Text style={styles.InvestmentTableheaderText}>Ended</Text>
              <Text style={styles.InvestmentTableheaderText}>Status</Text>
            </View>

            {/* Row 1 */}
            <View style={styles.dataRow}>
              <Text style={[styles.cellText, { color: '#2E7D32' }]}>Basic Plan</Text>
              <Text style={[styles.cellText, { color: '#2E7D32' }]}>₹1000</Text>
              <Text style={[styles.cellText, { color: '#2E7D32' }]}>Mar 19,2025</Text>
              <Text style={[styles.cellText, { color: '#2E7D32' }]}>Completed</Text>
            </View>


            {/* Row 2 */}
            <View style={styles.dataRow}>
              <Text style={[styles.cellText, { color: '#FDBE00' }]}>Gold Plan</Text>
              <Text style={[styles.cellText, { color: '#FDBE00' }]}>₹2500</Text>
              <Text style={[styles.cellText, { color: '#FDBE00' }]}>Mar 19,2025</Text>
              <Text style={[styles.cellText, { color: '#2E7D32' }]}>Completed</Text>
            </View>

            {/* Row 3 */}
            <View style={styles.dataRow}>
              <Text style={[styles.cellText, { color: '#2E7D32' }]}>Basic Plan</Text>
              <Text style={[styles.cellText, { color: '#2E7D32' }]}>₹1000</Text>
              <Text style={[styles.cellText, { color: '#2E7D32' }]}>Mar 19,2025</Text>
              <Text style={[styles.cellText, { color: '#2E7D32' }]}>Completed</Text>
            </View>

            {/* Row 4 */}
            <View style={styles.dataRow}>
              <Text style={[styles.cellText, { color: '#9747FF' }]}>Premium Plan</Text>
              <Text style={[styles.cellText, { color: '#9747FF' }]}>₹4000</Text>
              <Text style={[styles.cellText, { color: '#9747FF' }]}>Mar 19,2025</Text>
              <Text style={[styles.cellText, { color: '#2E7D32' }]}>Completed</Text>
            </View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default InvestScreen

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#34A853',
    width: "100%",
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  headerText: {
    color: '#fff',
    fontSize: RFValue(20),
    fontWeight: '500'
  },
  card: {
    // flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 15,
    marginHorizontal: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    position: 'relative',
  },
  borderBar: {
    width: 6,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    position: 'absolute',
    height: '100%',
    left: 0,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  textSection: {
    flex: 1,
    marginLeft: 25

  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: RFValue(14),
    fontWeight: 500,
    color: '#000',
  },
  text: {
    fontSize: RFValue(10),
    color: '#444',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    borderRadius: 6,
    width: '85%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  imageContainer: {
    marginRight: 20
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  investmentHeaderText: {
    margin: 15,
    fontSize: RFValue(20),
    fontWeight: 500
  },
  horizontalScrollContainer: {

  },
  ongoingInvestmentCard: {
    width: 210,
    borderRadius: 6,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowRadius: 4,
    elevation: 5,
    shadowColor: '#000',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  planTitle: {
    color: '#fff',
    fontSize: RFValue(14),
    fontWeight: '500',
  },
  label: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 400
  },
  slider: {
    width: '100%',
    height: 15,
    marginVertical: 5,
  },
  detail: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 3,
  },
  InvestmentTablecontainer: {
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 3,
  },
  InvestmentTableheaderRow: {
    flexDirection: 'row',
    backgroundColor: '#34A853',
    padding: 10,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  InvestmentTableheaderText: {
    flex: 1,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  cellText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
  },
})
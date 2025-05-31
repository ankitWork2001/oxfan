import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import Slider from '@react-native-community/slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveInvestments, fetchInvestmentsHistory, getPlans } from '../store/features/investment/investmentThunk';
import { AppDispatch, RootState } from '../store/store';

interface InvestmentPlan {
  _id?: string;
  name?: string;
  roiPercent?: number;
  minAmount?: number;
  durationDays?: number;
  autoPayout?: boolean;
}

interface PlanId {
  name?: string;
}

interface InvestmentHistoryItem {
  _id?: string;
  planId?: PlanId;
  amount?: number;
  endDate?: string;
  status?: string;
  // Add other properties as needed
}

interface ActiveInvestment {
  _id?: string;
  planId?: PlanId;
  amount?: number;
  earnings?: number;
  startDate?: string;
  endDate?: string;
  progress?: number;
}

interface ActiveInvestmentsResponse {
  investments?: ActiveInvestment[];
}

interface InvestmentHistoryResponse {
  success?: boolean;
  message?: string;
  investments?: InvestmentHistoryItem[];
}

const { width } = Dimensions.get('window');

const InvestScreen = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const [investmentHistory, setInvestmentHistory] = useState<InvestmentHistoryItem[]>([]);

  const { activeInvestments, investmentPlans, plansLoading, plansError } = useSelector(
    (state: RootState) => state.investment
  );

  useEffect(() => {
    dispatch(getPlans())
      .unwrap()
      .then((res: InvestmentPlan[]) => {
        console.log('Fetched Plans:', res);
      })
      .catch((err: Error) => {
        console.log('Error fetching plans:', err);
      });

    dispatch(fetchActiveInvestments())
      .unwrap()
      .then((res: ActiveInvestmentsResponse) => {
        console.log('Fetched Active Investments:', res);
      })
      .catch((err: Error) => {
        console.log('Error fetching investments:', err);
      });

    dispatch(fetchInvestmentsHistory())
      .unwrap()
      .then((res: InvestmentHistoryResponse) => {
        console.log('Fetched investment history:', res);
        if (res.investments) {
          setInvestmentHistory(res.investments);
        }
      })
      .catch((err: Error) => {
        console.log('Error fetching history:', err);
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
            investmentPlans.map((plan: InvestmentPlan, index: number) => {
              const planNameLower = plan.name?.toLowerCase() || '';

              const planColor =
                planNameLower.includes('gold') ? '#FDBE00' :
                  planNameLower.includes('premium') ? '#9747FF' :
                    planNameLower.includes('starter') ? '#0077FF' :
                      planNameLower.includes('ultra') ? '#10B981' :
                        planNameLower.includes('super') ? '#FF8632' :
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
            {activeInvestments?.investments?.length > 0 ? (
              activeInvestments.investments.map((investment: ActiveInvestment, index: number) => {
                const planName = investment.planId?.name || 'Unknown Plan';
                const investedAmount = investment.amount;
                const earnings = investment.earnings || 0;
                const startDate = new Date(investment.startDate || '').toLocaleDateString();
                const endDate = new Date(investment.endDate || '').toLocaleDateString();
                const progressValue = investment.progress || 0.5;

                const backgroundColor =
                  planName.toLowerCase().includes('gold') ? '#FDBE00D9' : '#0077FFD9';

                return (
                  <View
                    key={investment._id || index}
                    style={[styles.ongoingInvestmentCard, { backgroundColor }]}
                  >
                    <View style={styles.headerRow}>
                      <Icon name="schedule" size={14} color="#fff" />
                      <Text style={styles.planTitle}> {planName}</Text>
                    </View>

                    <Text style={styles.label}>Progress</Text>

                    <Slider
                      style={styles.slider}
                      minimumValue={0}
                      maximumValue={1}
                      value={progressValue}
                      minimumTrackTintColor="#fff"
                      maximumTrackTintColor="#444"
                      thumbTintColor="#fff"
                      disabled // remove if you want interactive slider
                    />

                    <Text style={styles.detail}>Invested: ₹{investedAmount}</Text>
                    <Text style={styles.detail}>Earnings: ₹{earnings}</Text>
                    <Text style={styles.detail}>Next Payout: {startDate}</Text>
                    <Text style={styles.detail}>End Date: {endDate}</Text>
                  </View>
                );
              })
            ) : (
              <View style={styles.noInvestmentTextContainer}>
                <Text style={styles.noInvestmentText}>No active investments found.</Text>
              </View>
            )}
          </ScrollView>

          <Text style={styles.investmentHeaderText}>Past  Investment</Text>
          <View style={styles.InvestmentTablecontainer}>
            <View style={styles.InvestmentTableheaderRow}>
              <Text style={styles.InvestmentTableheaderText}>Plan Type</Text>
              <Text style={styles.InvestmentTableheaderText}>Amount</Text>
              <Text style={styles.InvestmentTableheaderText}>Ended</Text>
              <Text style={styles.InvestmentTableheaderText}>Status</Text>
            </View>

            {investmentHistory.length === 0 ? (
              <View style={styles.noDataRow}>
                <Text style={styles.noDataText}>No investment history available</Text>
              </View>
            ) : (
              investmentHistory.map((item: InvestmentHistoryItem, index: number) => {
                const planName = item.planId?.name || 'N/A';
                const amount = `₹${item.amount}`;
                const endDate = new Date(item.endDate || '').toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                });
                const status = item.status?.charAt(0).toUpperCase() + item.status?.slice(1);

                // Determine color
                let color = '#2E7D32'; // default green
                if (planName.toLowerCase().includes('gold')) {
                  color = '#FDBE00';
                } else if (planName.toLowerCase().includes('premium')) {
                  color = '#9747FF';
                }
                if (item.status === 'cancelled') {
                  color = '#D32F2F';
                } else if (item.status === 'pending') {
                  color = '#FDBE00';
                }

                return (
                  <View style={styles.dataRow} key={item._id || index}>
                    <Text style={[styles.cellText, { color }]}>{planName}</Text>
                    <Text style={[styles.cellText, { color }]}>{amount}</Text>
                    <Text style={[styles.cellText, { color }]}>{endDate}</Text>
                    <Text style={[styles.cellText, { color }]}>{status}</Text>
                  </View>
                );
              })
            )}
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
  horizontalScrollContainer: {},
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
  noInvestmentTextContainer: {
    marginHorizontal: width * 0.17,
    marginVertical: width * 0.07
  },
  noInvestmentText: {
    fontSize: RFValue(20),
    fontWeight: 'bold'
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
  noDataRow: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
  },
})
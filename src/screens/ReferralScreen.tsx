import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import ReferralPageUpparPart from '../components/ReferralPageUpparPart';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchReferralBonusHistory, fetchReferralSummary, fetchRewardWallet } from '../store/features/reward/rewardThunk';

const ReferralScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { referralBonusHistory, referralSummary } = useSelector((state: RootState) => state.reward);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchReferralSummary())
        .unwrap()
        .then((data) => {
          console.log('fetching referral summary:', data);
        })
        .catch((error) => {
          console.error('❌ Error fetching referral summary:', error);
        });

      dispatch(fetchRewardWallet())
        .unwrap()
        .then((data) => {
          console.log('fetching Reward Wallet:', data);
        })
        .catch((error) => {
          console.error('❌ Error fetching  Reward Wallet:', error);
        });

      dispatch(fetchReferralBonusHistory())
        .unwrap()
        .then((data) => {
          console.log('fetching Reward History:', data);
        })
        .catch((error) => {
          console.error('❌ Error fetching  Reward History:', error);
        });
    }, [dispatch])
  );

  return (
    <SafeAreaView style={styles.MainContainer}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: insets.bottom + hp('13%'),
        }}
        showsVerticalScrollIndicator={false}
      >
        <ReferralPageUpparPart />

        <Text style={styles.headerText}>Commission Levels</Text>

        <View style={styles.Tablecontainer}>
          <View style={styles.headerRowcontainer}>
            <Text style={styles.TableheaderText}>Level</Text>
            <Text style={styles.TableheaderText}>Commission</Text>
          </View>

          {[
            { level: 'Level 1', commission: '10%' },
            { level: 'Level 2', commission: '5%' },
            { level: 'Level 3', commission: '2%' },
          ].map((item, index) => (
            <View key={index} style={styles.dataRow}>
              <Text style={styles.cellText}>{item.level}</Text>
              <Text style={styles.cellText}>{item.commission}</Text>
            </View>
          ))}

          <View style={styles.showDetailsButtonContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ReferralDetails')}
              style={styles.showDetailsButton}
            >
              <Text style={styles.showDetailsButtonText}>Show Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.headerText, { marginTop: hp('3%') }]}>Your Team</Text>
        <View style={styles.yourTeamContainer}>
          {[
            { label: 'Total Referrals', value: `${referralSummary.totalReferrals}`, bgColor: '#FDBE00' },
            { label: 'Earnings', value: `${referralSummary.earnings}`, bgColor: '#10B981' },
            { label: 'Active Investors', value: `${referralSummary.activeInvestors ?? '0'}`, bgColor: '#FF8632' },
          ].map((item, index) => (
            <View
              key={index}
              style={[styles.teamBox, { backgroundColor: item.bgColor }]}
            >
              <Text style={styles.teamBoxText}>{item.label}</Text>
              <Text style={styles.teamBoxNumber}>{item.value}</Text>
            </View>
          ))}
        </View>

        <Text style={[styles.headerText, { marginTop: hp('3%') }]}>Bonus History</Text>

        <View style={styles.Tablecontainer}>
          <View style={styles.headerRowcontainer}>
            <Text style={styles.TableheaderText}>Date</Text>
            <Text style={styles.TableheaderText}>Amount</Text>
            <Text style={styles.TableheaderText}>Level</Text>
          </View>

          {referralBonusHistory?.length > 0 ? (
            referralBonusHistory.map((item, index) => (
              <View key={index} style={[styles.dataRow, { backgroundColor: '#84D299' }]}>
                <Text style={[styles.cellText, { color: '#fff' }]} allowFontScaling={false}>
                  {item.date
                    ? new Date(item.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                    : 'N/A'}
                </Text>
                <Text style={[styles.cellText, { color: '#fff' }]}>{`₹${item.amount}`}</Text>
                <Text style={[styles.cellText, { color: '#fff' }]}>1</Text>
              </View>
            ))
          ) : (
            <View style={[styles.dataRow, { justifyContent: 'center', backgroundColor: '#84D299' }]}>
              <Text style={[styles.cellText, { color: '#000', textAlign: 'center' }]}>
                No reward history available
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReferralScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: RFValue(18),
    fontWeight: '600',
    marginHorizontal: wp('5%'),
    marginTop: hp('2%'),
  },
  Tablecontainer: {
    borderRadius: wp('2%'),
    backgroundColor: '#fff',
    marginHorizontal: wp('5%'),
    marginVertical: hp('1%'),
    elevation: 3,
    overflow: 'hidden',
  },
  headerRowcontainer: {
    flexDirection: 'row',
    backgroundColor: '#34A853',
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('2.5%'),
  },
  TableheaderText: {
    flex: 1,
    color: '#fff',
    fontWeight: '700',
    fontSize: RFValue(12),
    textAlign: 'left',
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('2.5%'),
  },
  cellText: {
    flex: 1,
    fontSize: RFValue(12),
    textAlign: 'left',
    fontWeight: '600',
  },
  showDetailsButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('1.2%'),
  },
  showDetailsButton: {
    backgroundColor: '#FF8800',
    width: '90%',
    paddingVertical: hp('1.2%'),
    borderRadius: wp('1.2%'),
  },
  showDetailsButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: RFValue(14),
    fontWeight: '500',
  },
  yourTeamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: wp('2.5%'),
    marginVertical: hp('1.2%'),
  },
  teamBox: {
    width: wp('27%'),
    height: hp('8%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
    padding: wp('1.2%'),
  },
  teamBoxText: {
    color: '#fff',
    fontSize: RFValue(10),
    textAlign: 'center',
  },
  teamBoxNumber: {
    color: '#fff',
    fontSize: RFValue(18),
    fontWeight: '700',
  },
});
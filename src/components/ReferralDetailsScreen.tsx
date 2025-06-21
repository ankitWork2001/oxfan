import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchReferralBonusHistory } from '../store/features/reward/rewardThunk';

const ReferralDetailsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { referralBonusHistory, loading } = useSelector((state: RootState) => state.reward);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchReferralBonusHistory())
        .unwrap()
        .then((data) => {
          console.log('✅ Referral referralBonusHistory fetched:', data);
        })
        .catch((error) => {
          console.error('❌ Error fetching referral referralBonusHistory:', error);
        });
    }, [dispatch])
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContentContainer}>
        <View style={styles.headerTextContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={RFValue(20)} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Referral Earnings</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon name="notifications" size={RFValue(20)} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={[styles.tabsMainContainer, { padding: wp('2%') }]}>
        <View style={styles.levelTabsContainer}>
          <View style={[styles.levelTab]}>
            <Text style={styles.levelTabTitle}>LEVEL 1</Text>
            <View style={styles.activeIndicator} />
          </View>
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Joined On</Text>
          <Text style={styles.headerCell}>Earnings</Text>
        </View>

        {loading ? (
          <Text style={{ textAlign: 'center', padding: 10 }}>Loading...</Text>
        ) : referralBonusHistory?.length > 0 ? (
          referralBonusHistory.map((item, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{item.name || 'N/A'}</Text>
              <Text style={styles.cell}>
                {item.date
                  ? new Date(item.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                  : 'N/A'}
              </Text>
              <Text style={styles.cell}>₹{item.amount || 0}</Text>
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginVertical: 10 }}>No Referrals found</Text>
        )}
      </View>
    </SafeAreaView >
  );
};

export default ReferralDetailsScreen;

const styles = StyleSheet.create({
  headerContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#34A853',
    paddingVertical: hp('4%'),
    paddingHorizontal: wp('6%'),
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'),
  },
  levelTabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#84D299',
    borderTopLeftRadius: wp('3%'),
    borderTopRightRadius: wp('3%'),
    marginVertical: hp('1%'),
  },

  levelTab: {
    alignItems: 'center',
    paddingVertical: hp('2%'),
    flex: 1,
    position: 'relative',
  },

  levelTabTitle: {
    fontWeight: '700',
    fontSize: RFValue(18),
    color: '#FFFFFF',
  },


  activeIndicator: {
    height: 2,
    width: '60%',
    backgroundColor: '#FFA500', // Orange underline
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    borderRadius: 1,
  },
  headerText: {
    fontSize: RFValue(20),
    fontWeight: '500',
    color: '#fff',
  },
  tabsMainContainer: {
    borderRadius: wp('2%'),
    backgroundColor: '#fff',
    marginHorizontal: wp('5%'),
    marginVertical: hp('1.5%'),
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F1F1F1',
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('2%'),
    borderRadius: wp('2%'),
    marginBottom: hp('1%'),
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: RFValue(12),
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: hp('1.2%'),
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: wp('2%'),
  },
  cell: {
    flex: 1,
    fontSize: RFValue(13),
    textAlign: 'center',
  },
});

import React, { useState } from 'react';
import { Modal, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SpinPageBackSide from '../components/SpinPageBackSide';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FortuneWheel from './spinwheele';

const SpinScreen = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* <ImageBackground
        source={require('../assests/spinPageBGImage.png')}
        style={styles.BGImage}
        resizeMode="cover"
      >
        <SpinPageBackSide />

        <View style={styles.spinWheelImageContainer}>
          <Image
            source={require('../assests/spinWheelImage.png')}
            style={styles.spinWheelImage}
          />

          <Icon
            name='keyboard-double-arrow-down'
            size={RFValue(40)}
            color='#FFFFFFA1'
            style={styles.DownIcon}
          />

          <View style={styles.signInButtonContainer}>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => setShowModal(true)}
            >
              <Text style={styles.signInButtonText}>Spin Now</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.freeSpinText}>
            Daily 3 Spins Free More spins via referral
          </Text>
        </View>
      </ImageBackground> */}
      <FortuneWheel />

      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require('../assests/spinPageGiftImage.png')}
              style={styles.modalImage}
              resizeMode='contain'
            />
            <Text style={styles.modalTitle}>Lucky Spin Star!</Text>
            <Text style={styles.modalSubtitle}>You've Won A Gift Pack</Text>
            <Text style={styles.modalText}>Spin Now For Another Win!</Text>

            <Icon
              name='keyboard-double-arrow-down'
              size={RFValue(24)}
              color="orange"
              style={styles.modalArrowIcon}
            />

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.signInButtonText}>Spin Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </SafeAreaView>
  );
};

export default SpinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  BGImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  spinWheelImageContainer: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: '95%',
    width: '95%',
    bottom: hp('7%'),
    left: wp('2%'),
  },
  spinWheelImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain'
  },
  signInButtonContainer: {
    position: 'absolute',
    bottom: hp('15%'),
    width: '100%',
    alignItems: 'center',
  },
  signInButton: {
    backgroundColor: 'green',
    width: wp('80%'),
    paddingVertical: hp('1.5%'),
    marginTop: hp('5%'),
    borderRadius: wp('1%'),
    zIndex: 10,
    elevation: 10
  },
  signInButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: RFValue(14),
    fontWeight: '400'
  },
  DownIcon: {
    position: 'absolute',
    bottom: hp('20%'),
  },
  freeSpinText: {
    position: 'absolute',
    bottom: hp('12%'),
    textAlign: 'center',
    color: '#fff',
    fontSize: RFValue(10),
    fontWeight: 'normal',
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: wp('5%'),
    borderRadius: wp('2.5%'),
    width: wp('80%'),
    height: hp('50%'),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalImage: {
    width: wp('25%'),
    height: hp('12%'),
    marginBottom: hp('1.5%'),
  },
  modalTitle: {
    fontSize: RFValue(36),
    fontWeight: 'bold',
    color: '#FF8800',
    marginBottom: hp('1%'),
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: RFValue(22),
    fontWeight: '400',
    marginBottom: hp('1%'),
    textAlign: 'center',
  },
  modalText: {
    fontSize: RFValue(12),
    marginBottom: hp('1%'),
    textAlign: 'center',
  },
  modalArrowIcon: {
    marginBottom: hp('1%'),
  },
  modalButton: {
    backgroundColor: 'green',
    paddingVertical: hp('1.5%'),
    width: wp('70%'),
    borderRadius: wp('1%'),
    marginBottom: hp('2%'),
  },
});
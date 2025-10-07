import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { useLoader } from '../context/Loader.context.js';
import { colors } from '../constants/colors.js';

const Loader = ({ msg }) => (
  <View style={styles.loaderBox}>
    <ActivityIndicator size={56} color={colors.primary} />
    {msg ? <Text style={styles.text}>{msg}</Text> : null}
  </View>
);

const GlobalLoader = () => {
  const { showLoad } = useLoader();

  if (!showLoad.show) return null;

  return (
    <>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
        pointerEvents="auto"
      />
      <View style={styles.centeredContainer} pointerEvents="box-none">
        <Loader msg={showLoad.msg} />
      </View>
    </>
  );
};

export default GlobalLoader;

const styles = StyleSheet.create({
  loaderBox: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
    width: 200,
    height: 130,

  },
  text: {
    fontSize: 16,
    color: '#070A0D',
    textAlign: 'center',
    fontFamily: 'Lato-Bold',
  },
  centeredContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

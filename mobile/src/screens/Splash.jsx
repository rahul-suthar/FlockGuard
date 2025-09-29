import { StyleSheet, Text } from 'react-native';
import { fonts } from '../constants/fontSize';
import { colors } from '../constants/colors';

const Splash = () => {
  return (
      <Text style={styles.brandText}>FlockGuard</Text>
  );
};

export default Splash;

const styles = StyleSheet.create({
  brandText: {
    fontSize: fonts.brand.main,
    fontFamily: 'Lato-Black',
    color: colors.primary,
    textAlign: 'center'
  },
});

import { StyleSheet, Text, View } from 'react-native';
import { fonts } from '../constants/fontSize.js';
import { useTheme } from '../context/Theme.context.js';

const Popup = ({ data }) => {
  const colors = useTheme();
  return (
    <View
      style={[
        styles.popup,
        {
          backgroundColor: data.success ? colors.success : colors.error,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: data.success ? colors.appBg : colors.cardBg },
        ]}
      >
        {data.msg}
      </Text>
    </View>
  );
};

export default Popup;

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 90,
    minWidth: 200,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  text: {
    fontSize: fonts.text.primary,
    fontFamily: 'Lato-Bold',
    textAlign: 'center',
  },
});

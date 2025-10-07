import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors.js';
import { fonts } from '../constants/fontSize.js';

const Popup = ({ data }) => {
  return (
    <View
      style={[
        styles.popup,
        { backgroundColor: data.success ? colors.success : colors.error },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: data.success ? colors.textPrimary : colors.textWhite },
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
    alignSelf: "center",
    bottom: 90,
    minWidth: 200,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 3,
    shadowColor: colors.primary,
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

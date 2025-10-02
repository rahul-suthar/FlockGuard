import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { handleLogOut } from '../apis/auth.js';
import { usePopup } from '../context/PopupContext.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors.js';
import { fonts } from '../constants/fontSize.js';

const Profile = () => {
  const { setUser } = useAuth();
  const { showPopup } = usePopup();

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => handleLogOut(setUser, showPopup)}
      >
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBg,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 90
  },
  btn: {
    width: 200,
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 5,
    alignItems: 'center'
  },
  btnText: {
    fontFamily: 'Lato-Bold',
    fontSize: fonts.btn.secondary,
  }
});

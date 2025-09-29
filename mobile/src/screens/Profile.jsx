import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { handleLogOut } from '../apis/auth.js';
import { usePopup } from '../context/PopupContext.js';

const Profile = () => {
  const { setUser } = useAuth();
  const { showPopup } = usePopup();

  return (
    <View>
      <Text>Profile</Text>
      <Button title="Logout" onPress={() => handleLogOut(setUser, showPopup)} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});

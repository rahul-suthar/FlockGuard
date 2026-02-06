import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import { useAuth } from '../context/Auth.context.js';
import { handleLogOut } from '../apis/auth.js';
import { usePopup } from '../context/Popup.context.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../constants/fontSize.js';
import { useLoader } from '../context/Loader.context.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import ProfileForm from '../components/ProfileForm.jsx';
import { BlurView } from '@react-native-community/blur';
import { useTheme } from '../context/Theme.context.js';

const Profile = () => {
  const { user, setUser } = useAuth();
  const { showPopup } = usePopup();
  const { setShowLoad } = useLoader();
  const [farmNo, setFarmNo] = useState(0);
  const [openform, setOpenForm] = useState(false);
  const colors = useTheme();
  const theme = useColorScheme();

  useEffect(() => {
    const getFarmNo = async () => {
      try {
        const farmString = await AsyncStorage.getItem('farms');
        const farms = farmString ? JSON.parse(farmString) : [];
        setFarmNo(farms.length);
      } catch {
        setFarmNo(0);
      }
    };
    getFarmNo();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={[styles.root, { backgroundColor: colors.appBg }]}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatarWrap, { backgroundColor: colors.accent }]}>
            <Text style={[styles.avatarText, { color: colors.textWhite }]}>
              {user.name ? user.name.charAt(0).toUpperCase() : '?'}
            </Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
          <View style={styles.infoList}>
            {[
              { label: 'Name', value: user.name },
              { label: 'Farms', value: farmNo },
              { label: 'Phone', value: user.phone?.mobileNo || '—' },
              { label: 'Email', value: user.email || '—' },
              { label: 'Language', value: user.language || 'English' },
              {
                label: 'Joined',
                value: user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('en-GB')
                  : '-',
              },
            ].map((item, index) => (
              <View key={index} style={styles.infoRow}>
                <Text
                  style={[styles.infoLabel, { color: colors.textSecondary }]}
                >
                  {item.label}
                </Text>
                <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: colors.input }]}
              onPress={() => setOpenForm(true)}
            >
              <Text
                style={[styles.actionText, { color: colors.textSecondary }]}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: colors.primary }]}
              onPress={() => handleLogOut(setUser, showPopup, setShowLoad)}
            >
              <Text style={[styles.actionText, { color: colors.textWhite }]}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footerNote}>
          <Text style={[styles.noteText, { color: colors.textSecondary }]}>
            Manage farms, reports and account settings from here.
          </Text>
        </View>

        {openform && (
          <>
            <BlurView
              style={[StyleSheet.absoluteFill, {zIndex:3}]}
              blurType={theme}
              blurAmount={10}
              reducedTransparencyFallbackColor="white"
            />
            <ProfileForm setOpenForm={setOpenForm} />
          </>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Profile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  avatarContainer: {
    alignItems: 'center',
    zIndex: 1,
    marginBottom: -40,
  },
  avatarWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  avatarText: {
    fontSize: 42,
    fontFamily: 'Lato-Bold',
  },
  card: {
    borderRadius: 20,
    padding: 20,
    paddingTop: 50,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    overflow: 'hidden',
  },
  infoList: {
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E2E8F0',
  },
  infoLabel: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
  },
  infoValue: {
    fontFamily: 'Lato-Bold',
    fontSize: 15,
    textAlign: 'right',
    flex: 1,
    marginLeft: 20,
  },
  actionRow: {
    marginTop: 20,
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  footerNote: {
    marginTop: 30,
    alignItems: 'center',
  },
  noteText: {
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    lineHeight: 18,
  }
});
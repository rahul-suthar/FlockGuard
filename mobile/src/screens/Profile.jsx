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
        <View style={[styles.avatarWrap, { backgroundColor: colors.accent }]}>
          <Text style={[styles.avatarText, { color: colors.textWhite }]}>
            {user.name ? user.name.charAt(0).toUpperCase() : '?'}
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
          <View style={styles.infoList}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                Name
              </Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
                {user.name}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                Farms
              </Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
                {farmNo}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                Phone
              </Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
                {user.phone?.mobileNo || '—'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                Email
              </Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
                {user.email || '—'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                Language
              </Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
                {user.language || 'en'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                Joined
              </Text>
              <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString('en-GB')
                  : '—'}
              </Text>
            </View>
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
          <Text
            style={{
              color: colors.textSecondary,
              fontFamily: 'OpenSans-Regular',
            }}
          >
            Manage farms, reports and account settings from here.
          </Text>
        </View>

        {openform && (
          <>
            <BlurView
              style={StyleSheet.absoluteFill}
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
    paddingHorizontal: 20,
  },
  avatarWrap: {
    width: 106,
    height: 92,
    borderRadius: 46,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    left: '36%',
  },
  avatarText: {
    fontSize: 36,
    fontFamily: 'Lato-Bold',
  },
  card: {
    marginTop: -18,
    borderRadius: 16,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },

  infoList: {
    gap: 6,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 0.2,
    borderBottomColor: 'hsl(0, 0%, 70%)',
    paddingHorizontal: 8,
  },
  infoLabel: {
    fontFamily: 'OpenSans-Regular',
    fontSize: fonts.text.primary,
  },
  infoValue: {
    fontFamily: 'Lato-Bold',
    fontSize: fonts.text.primary,
  },

  actionRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  footerNote: {
    marginTop: 20,
    alignItems: 'center',
  },
});

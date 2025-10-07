import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/Auth.context.js';
import { handleLogOut } from '../apis/auth.js';
import { usePopup } from '../context/Popup.context.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors.js';
import { fonts } from '../constants/fontSize.js';
import { useLoader } from '../context/Loader.context.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const Profile = () => {
  const { user, setUser } = useAuth();
  const { showPopup } = usePopup();
  const { setShowLoad } = useLoader();
  const [farmNo, setFarmNo] = useState(0);

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
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <View style={styles.avatarWrap}>
          <Text style={styles.avatarText}>
            {user.name ? user.name.charAt(0).toUpperCase() : '?'}
          </Text>
        </View>
        <View style={styles.nameBlock}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.role}>{user.role?.toUpperCase() || 'FARMER'}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.statRow}>
          <View style={styles.statCol}>
            <Text style={styles.statNum}>{farmNo}</Text>
            <Text style={styles.statLabel}>Farms</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statCol}>
            <Text style={styles.statNum}>{user.phone?.mobileNo || '—'}</Text>
            <Text style={styles.statLabel}>Phone</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statCol}>
            <Text style={styles.statNum}>{user.email || '—'}</Text>
            <Text style={styles.statLabel}>Email</Text>
          </View>
        </View>

        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Language</Text>
            <Text style={styles.infoValue}>{user.language || 'en'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Joined</Text>
            <Text style={styles.infoValue}>
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
            </Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.editBtn]}
            onPress={() => showPopup({ success: true, msg: 'Edit profile — TODO' })}
          >
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, styles.logoutBtn]}
            onPress={() => handleLogOut(setUser, showPopup, setShowLoad)}
          >
            <Text style={[styles.actionText, { color: colors.textWhite }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footerNote}>
        <Text style={styles.noteText}>Manage farms, reports and account settings from here.</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.appBg,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarWrap: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
  },
  avatarText: {
    fontSize: 36,
    color: colors.textWhite,
    fontFamily: 'Lato-Bold',
  },
  nameBlock: {
    flex: 1,
  },
  name: {
    fontSize: fonts.head.primary,
    fontFamily: 'Lato-Bold',
    color: colors.textPrimary,
  },
  role: {
    marginTop: 4,
    fontSize: fonts.text.primary,
    color: colors.textSecondary,
    fontFamily: 'OpenSans-Regular',
  },

  card: {
    marginTop: 24,
    borderRadius: 16,
    padding: 16,
    backgroundColor: colors.cardBg,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },

  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statCol: {
    alignItems: 'center',
    paddingHorizontal: 7,
  },
  statNum: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
    color: colors.textPrimary,
  },
  statLabel: {
    marginTop: 6,
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: 'OpenSans-Regular',
  },
  divider: {
    width: 1,
    height: 48,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },

  infoList: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.2)',
    paddingTop: 12,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  infoLabel: {
    color: colors.textSecondary,
    fontFamily: 'OpenSans-Regular',
  },
  infoValue: {
    color: colors.textPrimary,
    fontFamily: 'Lato-Bold',
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
  editBtn: {
    backgroundColor: colors.input,
  },
  logoutBtn: {
    backgroundColor: colors.primary,
  },
  actionText: {
    fontFamily: 'Lato-Bold',
    color: colors.textPrimary,
  },

  footerNote: {
    marginTop: 20,
    alignItems: 'center',
  },
  noteText: {
    color: colors.textSecondary,
    fontFamily: 'OpenSans-Regular',
  },
});


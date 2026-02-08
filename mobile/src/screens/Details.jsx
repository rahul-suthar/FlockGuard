import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/Theme.context';
import { useCamera } from '../context/Camera.context';
import { usePopup } from '../context/Popup.context';
import { useLoader } from '../context/Loader.context';
import { useHealth } from '../context/Health.context';
import { fetchReports, createReport } from '../apis/report.js';
import ReportModal from '../components/ReportModal';

const Details = ({ navigation, route }) => {
  const colors = useTheme();
  const { item: farmDetails } = route.params;
  const { openCamera } = useCamera();
  const { setShowLoad } = useLoader();
  const { showPopup } = usePopup();
  const { isReady, isWakingUp, checkHealth } = useHealth();

  const [reports, setReports] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);

  const [selectedReport, setSelectedReport] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const STORAGE_KEY = `reports_${farmDetails._id}`;

  const loadData = useCallback(
    async (isManualRefresh = false) => {
      if (isManualRefresh)
        setShowLoad({ show: true, msg: 'Updating Reports...' });

      try {
        const cached = await AsyncStorage.getItem(STORAGE_KEY);
        if (cached) {
          setReports(JSON.parse(cached));
          setIsLoadingInitial(false);
        }

        const freshData = await fetchReports(farmDetails._id);
        if (freshData) {
          setReports(freshData);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(freshData));
        }
      } catch (err) {
        console.log('Fetch failed');
      } finally {
        setIsLoadingInitial(false);
        if (isManualRefresh) setShowLoad({ show: false, msg: '' });
      }
    },
    [farmDetails._id, STORAGE_KEY, setShowLoad],
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOpenCamera = () => {
    if (!isReady) {
      showPopup({
        success: false,
        msg: 'Please wait for AI Services to wake up',
      });
      checkHealth(true);
      return;
    }

    if (isProcessing) return;

    openCamera(async photo => {
      setIsProcessing(true);
      try {
        const path = photo.path.startsWith('file://')
          ? photo.path
          : `file://${photo.path}`;
        const newReport = await createReport(farmDetails._id, path);

        const updated = [newReport, ...reports];
        setReports(updated);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        showPopup({ success: true, msg: 'Report Created' });
      } catch (err) {
        const isRateLimited = err.response?.status === 429;
        showPopup({
          success: false,
          msg: isRateLimited
            ? 'Too many attempts. Please wait.'
            : 'Upload failed',
        });
      } finally {
        setTimeout(() => setIsProcessing(false), 3000);
      }
    });
  };

  const handleReportPress = report => {
    setSelectedReport(report);
    setModalVisible(true);
  };

  const renderReportItem = ({ item: report }) => (
    <TouchableOpacity
      onPress={() => handleReportPress(report)}
      activeOpacity={0.7}
      style={[styles.reportCard, { backgroundColor: colors.cardBg }]}
    >
      <View style={[styles.iconBox, { backgroundColor: colors.appBg }]}>
        <Ionicons name="document-text" size={24} color={colors.primary} />
      </View>
      <View style={styles.reportInfo}>
        <Text style={[styles.reportTitle, { color: colors.textPrimary }]}>
          ID: {report._id.slice(-8).toUpperCase()}
        </Text>
        <Text style={[styles.reportDate, { color: colors.textSecondary }]}>
          {report.createdAt
            ? new Date(report.createdAt).toLocaleDateString()
            : 'Pending'}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.appBg }]}>
      <View style={[styles.mapCard, { backgroundColor: colors.cardBg }]}>
        <Image
          style={styles.mapImg}
          source={require('../assets/images/map.png')}
        />
        <View style={styles.badgeGroup}>
          <View style={[styles.badge, { backgroundColor: colors.primary }]}>
            <Text style={styles.badgeText}>{farmDetails.location}</Text>
          </View>
          <View style={[styles.badge, { backgroundColor: colors.accent }]}>
            <Text style={styles.badgeText}>
              {farmDetails.type === 'pig' ? '🐷' : '🐔'} {farmDetails.size}{' '}
              Units
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.listHeader}>
        <View style={styles.headerGroup}>
          <Text style={[styles.sectionLabel, { color: colors.textPrimary }]}>
            Recent Reports
          </Text>
          <TouchableOpacity
            onPress={() => checkHealth(true)}
            style={[
              styles.statusBadge,
              {
                outlineWidth: 0.6,
                outlineColor: isReady ? colors.success : colors.disabled,
              },
            ]}
          >
            <Ionicons
              name={isReady ? 'checkmark-circle' : 'alert-circle'}
              size={18}
              color={isReady ? colors.success : colors.error}
            />
            <Text style={{ color: colors.textSecondary }}>Server</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => loadData(true)}>
          <Ionicons
            name="refresh-outline"
            size={22}
            color={colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={reports}
        renderItem={renderReportItem}
        keyExtractor={r => r._id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          isLoadingInitial ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No reports found.
            </Text>
          )
        }
      />

      <ReportModal
        visible={modalVisible}
        report={selectedReport}
        onClose={() => setModalVisible(false)}
        colors={colors}
      />

      <TouchableOpacity
        style={[
          styles.fab,
          {
            backgroundColor:
              !isReady || isProcessing ? colors.textSecondary : colors.primary,
          },
        ]}
        onPress={handleOpenCamera}
        disabled={isProcessing}
        activeOpacity={0.8}
      >
        {isProcessing ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Ionicons
            name={isReady ? 'camera' : 'timer-outline'}
            size={30}
            color="#FFF"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapCard: {
    height: 240,
    margin: 15,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
  },
  mapImg: { width: '100%', height: '100%', resizeMode: 'cover' },
  badgeGroup: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  badgeText: {
    color: '#FFF',
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 12,
  },
  headerGroup: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionLabel: { fontSize: 18, fontFamily: 'Lato-Bold' },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: { fontSize: 11, fontFamily: 'Lato-Bold' },
  refreshIcon: { padding: 4 },
  listContent: { paddingHorizontal: 15, paddingBottom: 100 },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 1,
  },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportInfo: { flex: 1, marginLeft: 15 },
  reportTitle: { fontFamily: 'Lato-Bold', fontSize: 15 },
  reportDate: { fontSize: 12, marginTop: 2 },
  fab: {
    width: 64,
    height: 64,
    borderRadius: 20,
    position: 'absolute',
    bottom: 30,
    right: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 16 },
});

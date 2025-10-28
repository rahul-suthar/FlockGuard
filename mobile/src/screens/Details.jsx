import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { useTheme } from '../context/Theme.context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCamera } from '../context/Camera.context';
import { fetchReports, createReport } from '../apis/report.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePopup } from '../context/Popup.context.js';
import { useEffect, useState } from 'react';
import { fonts } from '../constants/fontSize.js';
import { useLoader } from '../context/Loader.context.js';

const Details = ({ navigation, route }) => {
  const colors = useTheme();
  const { item } = route.params;
  const { openCamera } = useCamera();
  const { showPopup } = usePopup();
  const { setShowLoad } = useLoader();
  const [reports, setreports] = useState([]);

  useEffect(() => {
    const getReports = async () => {
      const cachedReportsString = await AsyncStorage.getItem(
        `reports_${item._id}`,
      );
      let cachedReports = [];
      if (cachedReportsString) {
        cachedReports = JSON.parse(cachedReportsString);
      } else {
        const data = await fetchReports(item._id);
        await AsyncStorage.setItem(`reports_${item._id}`, JSON.stringify(data));
        setreports(data || []);
      }
    };

    setShowLoad({ show: true, msg: 'Loading Reports' });
    getReports();
    setShowLoad({ show: false, msg: '' });
  }, []);

  const handleOpenCamera = () => {
    openCamera(async capturedPhoto => {
      console.log('Photo captured: ', capturedPhoto);
      const key = `reports_${item._id}`;
      try {
        console.log('generating report');
        const photoPath = capturedPhoto.path.startsWith('file://')
          ? capturedPhoto.path
          : `file://${capturedPhoto.path}`;
        console.log(photoPath);
        const report = await createReport(item._id, photoPath);
        console.log('Report received: ', report);
        const raw = await AsyncStorage.getItem(key);
        const existing = raw ? JSON.parse(raw) : [];
        const next = existing.some(r => r._id === report._id)
          ? existing.map(r => (r._id === report._id ? report : r))
          : [...existing, report];
        await AsyncStorage.setItem(key, JSON.stringify(next));
        setreports(next);
        showPopup({ success: true, msg: 'Report created' });
      } catch (err) {
        console.log(err);
        showPopup({ success: false, msg: 'failed to create report' });
      }
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.appBg }]}>
      <View style={styles.locationContainer}>
        <View style={[styles.map, { backgroundColor: colors.cardBg }]}>
          <Image
            style={styles.img}
            source={require('../assets/images/map.png')}
          />
          <View style={styles.pin} />
        </View>
        <View style={styles.infoList}>
          <View style={styles.infoRow}>
            <Text style={{ fontSize: 16 }}>📍</Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
              {item.location}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              {item.type === 'pig' ? '🐷' : '🐔'}
            </Text>
            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
              {item.size}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.listContainer}>
        {reports.length === 0 ? (
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: colors.textPrimary,
            }}
          >
            No Reports
          </Text>
        ) : (
          <FlatList
            data={reports}
            renderItem={({ item }) => (
              <View
                style={[styles.itemRow, { backgroundColor: colors.cardBg }]}
              >
                <Text style={styles.itemText}>{item._id}</Text>
                <Text style={styles.itemText}>{item._id}</Text>
              </View>
            )}
            contentContainerStyle={{
              gap: 22,
              paddingBottom: 10,
              backgroundColor: colors.appBg,
            }}
            keyExtractor={item => item._id.toString()}
            showsVerticalScrollIndicator={false}
            initialNumToRender={5}
          />
        )}
      </View>

      <TouchableOpacity
        style={[styles.addBtn, { backgroundColor: colors.accent }]}
        onPress={() => handleOpenCamera()}
      >
        <Ionicons size={36} name="camera" />
      </TouchableOpacity>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 14,
  },
  locationContainer: {
    height: 250,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    borderWidth: 0.3,
    elevation: 1,
    overflow: 'hidden',
    padding: 2,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 12,
  },
  addBtn: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 18,
    bottom: 18,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.3,
    elevation: 2,
  },
  infoList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },
  infoRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  infoLabel: {
    fontFamily: 'OpenSans-Regular',
    fontSize: fonts.text.primary,
  },
  infoValue: {
    fontFamily: 'Lato-Bold',
    fontSize: fonts.text.primary,
  },
  itemRow: {
    height: 12,
    width: '100%',
  },
  itemText: {
    fontFamily: 'Lato-Bold',
    fontSize: fonts.text.secondary,
  },
  listContainer: {
    width: '96%',
    height: '60%',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderRadius: 12,
  },
  pin: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'red',
    position: 'absolute',
    top: 60,
    left: 130,
  },
});

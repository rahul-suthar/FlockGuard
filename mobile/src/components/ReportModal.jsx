import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ReportModal = ({ visible, report, onClose, colors }) => {
  if (!report) return null;
  if (visible) console.log(report);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={[StyleSheet.absoluteFill, styles.overlay]}>
        <View
          style={[styles.modalContainer, { backgroundColor: colors.cardBg }]}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              Report Details
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons
                name="close-circle"
                size={28}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                styles.imagePlaceholder,
                { backgroundColor: colors.appBg },
              ]}
            >
              {report.imageUrl ? (
                <Image
                  source={{ uri: report.imageUrl }}
                  style={styles.fullImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.noImage}>
                  <Ionicons
                    name="image-outline"
                    size={50}
                    color={colors.textSecondary}
                  />
                  <Text style={{ color: colors.textSecondary }}>
                    No Image Available
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.infoSection}>
              <View style={styles.infoRow}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Status:
                </Text>
                <Text style={[styles.value, { color: colors.textPrimary }]}>
                  {report.status}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Report ID:
                </Text>
                <Text style={[styles.value, { color: colors.textPrimary }]}>
                  {report._id.toUpperCase()}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={[styles.label, { color: colors.textSecondary }]}>
                  Created At:
                </Text>
                <Text style={[styles.value, { color: colors.textPrimary }]}>
                  {new Date(report.createdAt).toLocaleString()}
                </Text>
              </View>

              <View style={styles.divider} />

              <Text
                style={[
                  styles.label,
                  { color: colors.textSecondary, marginBottom: 8 },
                ]}
              >
                AI Analysis Result:
              </Text>
              <View
                style={[styles.resultBox, { backgroundColor: colors.appBg }]}
              >
                <Text
                  style={[styles.resultText, { color: colors.textPrimary }]}
                >
                  {report.aiResult.disease ||
                    'Analysis pending or no issues detected.'}
                </Text>
                <Text
                  style={[styles.resultText, { color: colors.textPrimary }]}
                >
                  {(report.aiResult.confidence * 100).toFixed(2)}%
                </Text>
              </View>

              <View style={styles.divider} />

              <Text
                style={[
                  styles.label,
                  { color: colors.textSecondary, marginBottom: 8 },
                ]}
              >
                Pharmacy :
              </Text>
              <View
                style={[styles.resultBox, { backgroundColor: colors.appBg }]}
              >
                <Text
                  style={[styles.resultText, { color: colors.textPrimary }]}
                >
                  {report.pharmacyResponse.length || 'Waiting for it.'}
                </Text>
              </View>

              <View style={styles.divider} />

              <Text
                style={[
                  styles.label,
                  { color: colors.textSecondary, marginBottom: 8 },
                ]}
              >
                Vet Review :
              </Text>
              <View
                style={[styles.resultBox, { backgroundColor: colors.appBg }]}
              >
                <Text
                  style={[styles.resultText, { color: colors.textPrimary }]}
                >
                  {report.vetReview.length || 'Waiting for it.'}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ReportModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 25,
    padding: 24,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Lato-Bold',
  },
  imagePlaceholder: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  noImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSection: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: 'Lato-Bold',
    fontSize: 14,
  },
  value: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    opacity: 0.3,
  },
  resultBox: {
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4,
  },
  resultText: {
    lineHeight: 20,
    fontSize: 14,
  },
});

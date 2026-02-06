import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/Theme.context';

const VetCard = ({ item }) => {
  const colors = useTheme();
  
  const isActive = !item.check.toLowerCase().includes('not');
  const statusLabel = isActive ? 'Active' : 'Away';
  const statusColor = isActive ? '#22C55E' : '#94A3B8';

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.cardContainer, { backgroundColor: colors.cardBg }]}
    >
      <View style={styles.cardContent}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={item.img} />
        </View>

        <View style={styles.details}>
          <View style={styles.statusRow}>
            <View style={[styles.dot, { backgroundColor: statusColor }]} />
            <Text style={[styles.statusText, { color: statusColor }]}>
              {statusLabel}
            </Text>
          </View>

          <View>
            <Text style={[styles.vetName, { color: colors.textPrimary }]}>
              Dr. {item.name}
            </Text>
            <Text style={[styles.specialty, { color: colors.textSecondary }]}>
              {item.type} Specialist
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VetCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginHorizontal: 2,
    overflow: 'hidden', 
  },
  cardContent: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    gap: 24,
  },
  imageWrapper: {
    width: 90,
    height: 90,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 50,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Lato-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  vetName: {
    fontSize: 17,
    fontFamily: 'Lato-Bold',
    marginBottom: 2,
  },
  specialty: {
    fontSize: 14,
    fontFamily: 'Lato-Regular',
  },
});

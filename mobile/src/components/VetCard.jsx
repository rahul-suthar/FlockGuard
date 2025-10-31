import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/Theme.context';

const VetCard = ({ item }) => {
  const colors = useTheme();
  return (
    <TouchableOpacity
      style={[styles.cardContainer, { backgroundColor: colors.cardBg }]}
    >
      <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
        <View
          style={{
            overflow: 'hidden',
            borderRadius: 8,
            aspectRatio: 1,
            height: 120,
          }}
        >
          <Image
            style={{
              height: '140%',
              width: '100%',
              objectFit: 'cover',
            }}
            source={item.img}
          />
        </View>
        <View
          style={{
            height: '100%',
            width: '50%',
            justifyContent: 'space-around',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Lato-Bold',
              color: colors.textPrimary,
            }}
          >
            {item.check.toLowerCase().includes('not') ? '🔸' : '⚡'}{' '}
            {item.check}
          </Text>
          <View
            style={{
              gap: 14,
              alignItems: 'center',
            }}
          >
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              Dr. {item.name}
            </Text>
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              🩺 {item.type} Specialist
            </Text>
            {/* <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              📍 {item.location}
            </Text> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VetCard;

const styles = StyleSheet.create({
  cardContainer: {
    elevation: 3,
    borderWidth: 0.3,
    borderRadius: 10,
    shadowRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  card: {
    aspectRatio: 3 / 1.3,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 6,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Lato-Bold',
  },
});

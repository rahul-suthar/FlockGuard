import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/Theme.context';
import FeatherIcon from 'react-native-vector-icons/Feather.js';

const Card = ({ item, handleDelete, navigation }) => {
  const colors = useTheme();
  
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.cardContainer, { backgroundColor: colors.cardBg }]}
      onPress={() => navigation.navigate('Details', { item: item })}
    >
      <View style={styles.cardContent}>
        <View style={styles.mainInfo}>
          <View style={styles.headerRow}>
            <Text style={[styles.farmName, { color: colors.textPrimary }]}>
              {item.name}
            </Text>

            <View style={[styles.badge, { backgroundColor: colors.appBg }]}>
              <Text style={styles.badgeText}>
                {item.type === 'pig' ? '🐷 Swine' : '🐔 Poultry'}
              </Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              Population: <Text style={{ color: colors.textPrimary }}>{item.size}</Text>
            </Text>
          </View>

          <View style={styles.locationRow}>
            <FeatherIcon name="map-pin" size={14} color={colors.textSecondary} />
            <Text numberOfLines={1} style={[styles.locationText, { color: colors.textSecondary }]}>
              {item.location}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.deleteBtn, { backgroundColor : colors.appBg }]}
          onPress={() => handleDelete(item)}
        >
          <FeatherIcon name="trash-2" size={18} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginHorizontal: 2,
    overflow: 'hidden', 
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainInfo: {
    flex: 1,
    gap: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  farmName: {
    fontSize: 18,
    fontFamily: 'Lato-Bold',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: 'Lato-Bold',
  },
  statsRow: {
    marginBottom: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    fontFamily: 'Lato-Regular',
    flex: 1,
  },
  deleteBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    borderWidth: 0.2,
  },
  infoText: {
    fontSize: 14,
    fontFamily: 'Lato-Regular',
  },
});
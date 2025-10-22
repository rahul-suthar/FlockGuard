import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fonts } from '../constants/fontSize';
import { useTheme } from '../context/Theme.context';
import FeatherIcon from 'react-native-vector-icons/Feather.js';

const Card = ({ item, handleDelete, navigation }) => {
  const colors = useTheme();
  return (
    <TouchableOpacity
      style={[styles.cardContainer, { backgroundColor: colors.cardBg }]}
      onPress={() => navigation.navigate('Details', { item: item })}
    >
      <View style={[styles.card, { backgroundColor: colors.cardBg }]}>
        <View style={{ gap: 14 }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Lato-Bold',
              color: colors.textPrimary,
            }}
          >
            {item.name}
          </Text>
          <View style={[styles.info]}>
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              {item.type === 'pig' ? '🐷' : '🐔'} {item.size}
            </Text>
          </View>
          <Text style={[styles.infoText, { color: colors.textSecondary }]}>
            📍 {item.location}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: colors.appBg }]}
          onPress={() => handleDelete(item)}
        >
          <FeatherIcon size={18} name="trash-2" color={colors.error} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

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
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 24,
  },
  btn: {
    paddingVertical: 6,
    borderRadius: 50,
    paddingHorizontal: 14,
    borderWidth: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0.3,
    position: 'absolute',
    top: 12,
    right: 12,
  },
  info: {
    borderRadius: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    marginTop: 4,
  },
  infoText: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
});

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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Lato-Bold',
              color: colors.textPrimary,
            }}
          >
            {item.name}
          </Text>
          <View
            style={[
              styles.info,
              {
                backgroundColor: colors.accent,
              },
            ]}
          >
            <Text style={styles.infoText}>
              {item.type === 'pig' ? '🐷' : '🐔'}
            </Text>
          </View>
        </View>
        <View style={{ gap: 5, paddingLeft: 20 }}>
          <Text style={{ color: colors.textSecondary }}>
            Size : {item.size}
          </Text>
          <Text style={{ color: colors.textSecondary }}>
            Location : {item.location}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.btn, { borderColor: colors.error, backgroundColor: colors.bgerror }]}
          onPress={() => handleDelete(item)}
        >
          <FeatherIcon size={18} name="trash-2" color={colors.error} />
          <Text
            style={{
              fontFamily: 'Lato-Bold',
              color: colors.error,
              textAlign: 'center',
            }}
          >
            Delete
          </Text>
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
    gap: 16,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  btn: {
    paddingVertical: 5,
    borderRadius: 50,
    width: '30%',
    alignSelf: 'flex-end',
    borderWidth: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    elevation: 0.8,
  },
  info: {
    borderRadius: 16,
    paddingHorizontal: 6,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  infoText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: fonts.text.caption,
    fontSize: 24,
  },
});

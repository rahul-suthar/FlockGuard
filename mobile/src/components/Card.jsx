import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fontSize';

const Card = ({ item, handleDelete, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: fonts.head.secondary.light, fontFamily: 'Lato-Bold' }}>
            {item.name}
          </Text>
          <View style={styles.info}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 50,
                backgroundColor: item.type === 'Pig' ? colors.pigType : colors.henType,
                alignSelf: 'center',
              }}
            />
            <Text style={{ fontFamily: 'OpenSans-Regular', color: colors.textPrimary }}>{item.type}</Text>
          </View>
        </View>
        <View style={{ gap: 5, paddingLeft: 20 }}>
          <Text>Size : {item.size}</Text>
          <Text>Location : {item.location}</Text>
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => handleDelete(item)}>
          <Text style={{ fontFamily: 'Lato-Bold', color: colors.textWhite, textAlign: 'center' }}>
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
    elevation: 4,
    borderWidth: 0.3,
    borderRadius: 10,
    backgroundColor: colors.cardBg,
    shadowRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    marginVertical: 8,
  },
  card: {
    borderRadius: 10,
    backgroundColor: colors.cardBg,
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  btn: {
    paddingVertical: 5,
    backgroundColor: colors.error,
    borderRadius: 50,
    width: '40%',
    alignSelf: 'flex-end',
  },
  info: {
    paddingVertical: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 50,
    backgroundColor: colors.accent,
    gap: 5,
  },
});

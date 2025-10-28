import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../constants/fontSize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/Theme.context.js';
import { useState } from 'react';
import VetCard from '../components/VetCard.jsx';

const filters = ['All', 'Pig', 'Poultry'];

const vetList = [
  {
    id: 1,
    check: 'Available',
    name: 'Vinod Kumar',
    type: 'Pig',
    location: 'Vadodara, gujarat, 345028',
  },
  {
    id: 2,
    check: 'Not available',
    name: 'Sunjay Dutt',
    type: 'Poultry',
    location: 'Mumbai, Maharastra, 349328',
  },
  {
    id: 3,
    check: 'Available',
    name: 'Akshay Kumar',
    type: 'Pig',
    location: 'bhopal, madhyapradesh, 390628',
  },
];

const Vet = () => {
  const colors = useTheme();
  const [currFilter, setCurrFilter] = useState('All');
  const [searchQuery, setsearchQuery] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.appBg }]}
      >
        <View style={{ marginVertical: 12 }}>
          <View style={styles.searchbarBox}>
            <TextInput
              value={searchQuery}
              onChangeText={text => setsearchQuery(text)}
              placeholderTextColor={colors.textSecondary}
              placeholder="search vets"
              style={[
                styles.inputs,
                { backgroundColor: colors.input, color: colors.textPrimary },
              ]}
              autoCapitalize="none"
            />
            {searchQuery !== '' && (
              <TouchableOpacity
                style={styles.resetQuery}
                onPress={() => setsearchQuery('')}
              >
                <Ionicons name="close" size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.filterToggles}>
            {filters.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.filters,
                  {
                    backgroundColor:
                      currFilter === item ? colors.accent : colors.disabled,
                    elevation: currFilter === item ? 3 : 1,
                    borderWidth: currFilter === item ? 0.7 : 0.2,
                  },
                ]}
                onPress={() => setCurrFilter(item)}
              >
                <Text
                  style={{
                    color: currFilter === item ? '' : colors.textSecondary,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View
          style={{
            width: '95%',
            height: '85%',
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}
        >
          <FlatList
            data={vetList}
            renderItem={({ item }) => <VetCard item={item} />}
            contentContainerStyle={{
              gap: 18,
              backgroundColor: colors.appBg,
            }}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            initialNumToRender={5}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Vet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 80,
    // paddingTop: -40,
    gap: 8,
  },
  inputs: {
    width: 350,
    paddingVertical: 12,
    paddingLeft: 20,
    paddingRight: 42,
    borderRadius: 50,
    fontFamily: 'Lato-Bold',
    fontSize: fonts.text.primary,
    borderWidth: 0.2,
  },
  searchbarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  resetQuery: {
    position: 'absolute',
    right: 12,
  },
  filterToggles: {
    flexDirection: 'row',
    gap: 20,
    padding: 16,
  },
  filters: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 50,
  },
});

import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../constants/fontSize';
import { useTheme } from '../context/Theme.context.js';
import { useEffect, useState } from 'react';
import VetCard from '../components/VetCard.jsx';
import SearchBar from '../components/SearchBar.jsx';

const vetList = [
  {
    id: 1,
    check: 'Available',
    name: 'Vinod Kumar',
    type: 'pig',
    location: 'Vadodara, gujarat, 345028',
  },
  {
    id: 2,
    check: 'Not available',
    name: 'Sunjay Dutt',
    type: 'poultry',
    location: 'Mumbai, Maharastra, 349328',
  },
  {
    id: 3,
    check: 'Available',
    name: 'Akshay Kumar',
    type: 'pig',
    location: 'bhopal, madhyapradesh, 390628',
  },
  {
    id: 4,
    check: 'Available',
    name: 'Akshay Kumar',
    type: 'pig',
    location: 'bhopal, madhyapradesh, 390628',
  },
];

const Vet = () => {
  const colors = useTheme();
  const [currFilter, setCurrFilter] = useState('All');
  const [searchQuery, setsearchQuery] = useState('');
  const [filteredVetList, setFilteredVetList] = useState([]);

  useEffect(() => {
    const newList = vetList.filter(item => {
      const type =
        currFilter !== 'All' ? item.type === currFilter.toLowerCase() : true;
      const name =
        searchQuery !== ''
          ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase())
          : true;

      return type && name;
    });

    setFilteredVetList(newList);
  }, [vetList, currFilter, searchQuery]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.appBg }]}
      >
        <View>
          <SearchBar
            searchQuery={searchQuery}
            setsearchQuery={setsearchQuery}
            currFilter={currFilter}
            setCurrFilter={setCurrFilter}
            colors={colors}
          />
        </View>

        <View
          style={{
            width: '90%',
            height: '95%',
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}
        >
          {filteredVetList.length === 0 ? (
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: colors.textPrimary,
              }}
            >
              No Vets.
            </Text>
          ) : (
            <FlatList
              data={filteredVetList}
              renderItem={({ item }) => <VetCard item={item} />}
              contentContainerStyle={{
                gap: 18,
                paddingBottom: 72,
                backgroundColor: colors.appBg,
              }}
              keyExtractor={item => item.id.toString()}
              showsVerticalScrollIndicator={false}
              initialNumToRender={5}
            />
          )}
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

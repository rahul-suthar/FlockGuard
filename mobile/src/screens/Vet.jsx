import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    img: require('../assets/images/Vet.png'),
  },
  {
    id: 2,
    check: 'Not available',
    name: 'Sunjay Dutt',
    type: 'poultry',
    location: 'Mumbai, Maharastra, 349328',
    img: require('../assets/images/Vet.png'),
  },
  {
    id: 3,
    check: 'Available',
    name: 'Akshay Kumar',
    type: 'pig',
    location: 'bhopal, madhyapradesh, 390628',
    img: require('../assets/images/Vet.png'),
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
                backgroundColor: 'transparent',
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
    paddingTop: 18,
    paddingBottom: 80,
    gap: 32,
  }
});

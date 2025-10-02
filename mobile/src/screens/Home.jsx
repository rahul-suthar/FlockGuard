import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { fonts } from '../constants/fontSize';
import { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const filters = ['All', 'Pigs', 'Hens'];
const farmsArr = [
  {
    id: 1,
    name: 'Pigny',
    size: 200,
    location: 'talab, france, 388291',
    type: 'Pig',
    status: 'Healthy',
  },
  {
    id: 2,
    name: 'Henies',
    size: 500,
    location: 'Albert Hall, france, 346291',
    type: 'Hen',
    status: 'need checkup',
  },
  {
    id: 3,
    name: 'Heniessy',
    size: 500,
    location: 'Albert Hall, france, 346291',
    type: 'Hen',
    status: 'Healthy',
  },
  {
    id: 4,
    name: 'pinnve',
    size: 500,
    location: 'Albert Hall, france, 346291',
    type: 'Hen',
    status: 'need checkup',
  },
];

const Home = () => {
  const [farms, setFarms] = useState(farmsArr);

  const handleDelete = item => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure ?\n"${item.name}" will be deleted`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setFarms(prev => prev.filter(f => f.id !== item.id));
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.searchbarBox}>
          <TextInput placeholder="search your farm" style={styles.inputs} />
          <View style={styles.filterBox}>
            <Ionicons name="filter" size={32} />
          </View>
        </View>
        <View style={styles.filterToggles}>
          {filters.map((item, index) => (
            <View key={index} style={styles.filters}>
              <Text>{item}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ width: '90%', height: '84%' }}>
        <FlatList
          data={farms}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontSize: fonts.head.secondary.light,
                    fontFamily: 'Lato-Bold',
                  }}
                >
                  {item.name}
                </Text>
                <View style={styles.info}>
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 50,
                      backgroundColor:
                        item.type === 'Pig' ? colors.pigType : colors.henType,
                    }}
                  />
                  <Text>{item.type}</Text>
                </View>
              </View>
              <View>
                <Text>Size : {item.size}</Text>
                <Text>Location : {item.location}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={[
                    styles.btn,
                    {
                      backgroundColor:
                        item.status === 'Healthy'
                          ? colors.accent
                          : colors.warning,
                    },
                  ]}
                >
                  <Text style={{ fontFamily: 'Lato-Bold' }}>{item.status}</Text>
                </View>
                <TouchableOpacity
                  style={[styles.btn, { backgroundColor: colors.error }]}
                  onPress={() => handleDelete(item)}
                >
                  <Text
                    style={{ fontFamily: 'Lato-Bold', color: colors.textWhite }}
                  >
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{ gap: 24, paddingBottom: 120 }}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity style={styles.addBtn}>
        <Ionicons size={40} name="add" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBg,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 90,
    paddingTop: -20,
    gap: 24,
  },
  inputs: {
    backgroundColor: colors.input,
    width: 300,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    fontFamily: 'OpenSans-Regular',
    fontSize: fonts.text.primary,
    color: colors.textPrimary,
  },
  searchbarBox: { flexDirection: 'row', gap: 20, alignItems: 'center' },
  filterBox: {
    width: 45,
    height: 45,
    backgroundColor: colors.input,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  filterToggles: {
    flexDirection: 'row',
    gap: 20,
    padding: 15,
  },
  filters: {
    borderWidth: 0.8,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 50,
    backgroundColor: colors.accent,
  },
  card: {
    backgroundColor: colors.cardBg,
    elevation: 5,
    borderRadius: 20,
    borderWidth: 0.4,
    gap: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: colors.accent,
    borderRadius: 50,
  },
  info: {
    paddingVertical: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 50,
    alignItems: 'center',
    backgroundColor: colors.accent,
    gap: 10,
  },
  addBtn: {
    width: 60,
    height: 60,
    backgroundColor: '#964141',
    position: 'absolute',
    right: 40,
    bottom: 100,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    elevation: 10,
    padding: 10,
  },
});

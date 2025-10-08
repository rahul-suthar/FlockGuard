import {
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fonts } from '../constants/fontSize';
import { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FarmInput from '../components/FarmInput.jsx';
import { BlurView } from '@react-native-community/blur';
import Card from '../components/Card.jsx';
import { deleteFarm, fetchFarms } from '../apis/user.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePopup } from '../context/Popup.context.js';
import { useLoader } from '../context/Loader.context.js';
import { useTheme } from '../context/Theme.context.js';

const filters = ['All', 'Pig', 'Poultry'];

const Home = () => {
  const [farms, setFarms] = useState([]);
  const [currFilter, setCurrFilter] = useState('All');
  const [filteredFarm, setfilteredFarm] = useState([]);
  const [searchQuery, setsearchQuery] = useState('');
  const [openform, setOpenForm] = useState(false);
  const { showPopup } = usePopup();
  const { setShowLoad } = useLoader();
  const colors = useTheme();
  const theme = useColorScheme();

  useEffect(() => {
    const getFarms = async () => {
      const cachedFarmsString = await AsyncStorage.getItem('farms');
      let cachedFarms = [];
      if (cachedFarmsString) {
        cachedFarms = JSON.parse(cachedFarmsString);
      }
      if (cachedFarms.length === 0) {
        const data = await fetchFarms(showPopup);
        await AsyncStorage.setItem('farms', JSON.stringify(data));
        setFarms(data || []);
      } else {
        setFarms(cachedFarms);
      }
    };

    const load = async () => {
      setShowLoad({ show: true, msg: 'Loading Farms' });
      await getFarms();
      setShowLoad({ show: false, msg: '' });
    };

    load();
  }, []);

  useEffect(() => {
    const filtered = farms.filter(item => {
      const type =
        currFilter !== 'All' ? item.type === currFilter.toLowerCase() : true;
      const name =
        searchQuery !== ''
          ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
          : true;

      return type && name;
    });

    setfilteredFarm(filtered);
  }, [farms, currFilter, searchQuery]);

  const handleDelete = item => {
    Alert.alert(
      'Are you sure ?',
      `"${item.name}" will be deleted`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setShowLoad({ show: true, msg: 'Deleting farm...' });
              await deleteFarm(item._id, showPopup);
              const updatedFarms = farms.filter(f => f._id !== item._id);
              setFarms(updatedFarms);
              await AsyncStorage.setItem('farms', JSON.stringify(updatedFarms));
            } catch (err) {
              console.log(err);
              showPopup({ success: false, msg: 'Unable to delete' });
            } finally {
              setShowLoad({ show: false, msg: '' });
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.appBg }]}
      >
        <View style={{ marginVertical: 4 }}>
          <View style={styles.searchbarBox}>
            <TextInput
              value={searchQuery}
              onChangeText={text => setsearchQuery(text)}
              placeholderTextColor={colors.textSecondary}
              placeholder="search your farm"
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
                <Ionicons name="close" size={24} />
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
            width: '90%',
            height: '82%',
            backgroundColor: 'transparent',
            justifyContent: 'center',
          }}
        >
          {filteredFarm.length === 0 ? (
            <Text
              style={{
                fontSize: 18,
                textAlign: 'center',
                color: colors.textPrimary,
              }}
            >
              No Farms
            </Text>
          ) : (
            <FlatList
              data={filteredFarm}
              renderItem={({ item }) => (
                <Card item={item} handleDelete={handleDelete} />
              )}
              contentContainerStyle={{
                gap: 22,
                paddingBottom: 10,
                backgroundColor: colors.appBg,
              }}
              keyExtractor={item => item._id.toString()}
              showsVerticalScrollIndicator={false}
              initialNumToRender={5}
            />
          )}
        </View>

        {openform ? (
          <>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType={theme}
              blurAmount={4}
              reducedTransparencyFallbackColor="white"
            />
            <FarmInput setOpenForm={setOpenForm} setFarms={setFarms} />
          </>
        ) : (
          <TouchableOpacity
            style={[styles.addBtn, { backgroundColor: colors.accent }]}
            onPress={() => setOpenForm(true)}
          >
            <Ionicons size={36} name="add" />
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingBottom: 80,
    paddingTop: -40,
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
  addBtn: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 24,
    bottom: 32,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.3,
    elevation: 2,
  },
});

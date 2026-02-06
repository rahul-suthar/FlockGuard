import {
  Alert,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FarmInput from '../components/FarmInput.jsx';
import { BlurView } from '@react-native-community/blur';
import Card from '../components/Card.jsx';
import { deleteFarm, fetchFarms } from '../apis/farm.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePopup } from '../context/Popup.context.js';
import { useLoader } from '../context/Loader.context.js';
import { useTheme } from '../context/Theme.context.js';
import SearchBar from '../components/SearchBar.jsx';

const Home = ({ navigation }) => {
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
            height: '85%',
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
                <Card
                  item={item}
                  handleDelete={handleDelete}
                  navigation={navigation}
                />
              )}
              contentContainerStyle={{
                gap: 22,
                paddingBottom: 72,
                backgroundColor: 'transparent',
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
              blurAmount={2}
            />
            <FarmInput setOpenForm={setOpenForm} setFarms={setFarms} />
          </>
        ) : (
          <TouchableOpacity
            style={[styles.addBtn, { backgroundColor: colors.primary }]}
            onPress={() => setOpenForm(true)}
          >
            <Ionicons size={36} name="add" color='white'/>
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
    paddingTop: 18,
    paddingBottom: 80,
    gap: 32,
  },
  addBtn: {
    width: 52*1.5,
    height: 52,
    position: 'absolute',
    right: 18,
    bottom: 14,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.3,
    elevation: 0.5,
  },
});

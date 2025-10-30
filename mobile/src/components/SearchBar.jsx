import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { fonts } from '../constants/fontSize';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBar = ({
  searchQuery,
  setsearchQuery,
  currFilter,
  setCurrFilter,
  colors,
}) => {
  const filters = ['All', 'Pig', 'Poultry'];
  return (
    <>
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
            <Ionicons name="close" size={24} color={colors.textSecondary} />
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
                elevation: currFilter === item ? 4 : 0,
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
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchbarBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
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

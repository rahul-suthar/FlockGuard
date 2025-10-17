import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/Theme.context';

const TabBar = ({ state, descriptors, navigation }) => {
  const colors = useTheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.cardBg },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name === 'Profile' ? 'Profile' : 'Home';

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const iconName = route.name === 'Profile' ? 'person' : 'home';

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={[
              styles.tab,
              { backgroundColor: isFocused ? colors.input : 'transparent' },
            ]}
          >
            <Ionicons
              name={iconName}
              size={isFocused ? 30 : 20}
              color={isFocused ? colors.primary : colors.textSecondary}
            />
            <Text
              style={{
                color: colors.textPrimary,
                fontFamily: 'Lato-Bold',
                display: isFocused ? 'none' : '',
                fontSize: 12,
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 68,
    paddingBottom: 8,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 50,
  },
});

import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/Theme.context';
import { memo, useEffect, useRef } from 'react';

const TabBarItems = memo(({ iconName, route, isFocused, onPress, colors }) => {
  const iconColorAnim = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  const iconColor = iconColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.disabled, colors.textPrimary],
  });

  const runAnimation = toFocus => {
    Animated.timing(iconColorAnim, {
      toValue: toFocus ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      console.log('tab changed with animation');
    });
  };

  useEffect(() => {
    runAnimation(isFocused);
  }, [isFocused]);

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      onPress={onPress}
      style={styles.tabContainer}
    >
      <Animated.View style={[styles.tab]}>
        <Animated.Text style={{ color: iconColor }}>
          <Ionicons name={iconName} size={32} />
        </Animated.Text>
        <Text style={{ fontWeight: isFocused ? 'bold' : '', fontSize: 14, color: colors.textSecondary }}>
          {route.name}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
});

const TabBar = ({ state, descriptors, navigation }) => {
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBg }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
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

        return (
          <TabBarItems
            key={route.key}
            route={route}
            iconName={options.iconName}
            isFocused={isFocused}
            onPress={onPress}
            colors={colors}
          />
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

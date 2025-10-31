import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context/Theme.context';
import { memo, useEffect, useRef } from 'react';

const TabBarItems = memo(({ iconName, isFocused, onPress, colors }) => {
  const iconColorAnim = useRef(new Animated.Value(isFocused ? 1 : 0)).current;
  const scaleAnim = useRef(new Animated.Value(isFocused ? 1.3 : 1)).current;
  const moveAnim = useRef(new Animated.Value(isFocused ? -3 : 0)).current;

  const iconColor = iconColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.textSecondary, colors.primary],
  });

  const runAnimation = toFocus => {
    Animated.parallel([
      Animated.timing(iconColorAnim, {
        toValue: toFocus ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(scaleAnim, {
        toValue: toFocus ? 1.3 : 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(moveAnim, {
        toValue: toFocus ? -3 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => {
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
      <Animated.View
        style={[
          styles.tab,
          {
            transform: [{ scale: scaleAnim }, { translateY: moveAnim }],
          },
        ]}
      >
        <Animated.Text style={{ color: iconColor }}>
          <Ionicons name={iconName} size={28} />
        </Animated.Text>
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
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 68,
    paddingBottom: 8,
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

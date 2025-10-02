import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

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

        const iconName =
          route.name === 'Home'
            ? 'home'
            : route.name === 'Reports'
            ? 'bar-chart'
            : 'person';

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={[styles.tab, {backgroundColor: isFocused ? colors.input : 'transparent'}]}
          >
            <Ionicons
              name={iconName}
              size={isFocused ? 35 : 25}
              color={isFocused ? colors.primary : colors.textSecondary}
            />
            <Text
              style={{
                color: colors.textPrimary,
                fontFamily: 'Lato-Bold',
                display: isFocused ? 'none' : '',
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
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 2,
    borderWidth: 0.3,
    borderColor: colors.primary,
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    right: 30,
    left: 30,
    backgroundColor: colors.appBg,
    elevation: 2,
    shadowRadius: 20,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 50
  },
});

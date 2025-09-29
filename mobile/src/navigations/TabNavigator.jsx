import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home.jsx';
import Report from '../screens/Report.jsx';
import Profile from '../screens/Profile.jsx';
import { Image, View } from 'react-native';
import { colors } from '../constants/colors.js';
import { fonts } from '../constants/fontSize.js';

const Tab = createBottomTabNavigator();

const icons = {
  Home: require('../assets/images/Home.png'),
  Reports: require('../assets/images/Reports.png'),
  Profile: require('../assets/images/Profile.png'),
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const size = focused ? 55 : 42;
          const lift = focused ? -18 : 0;
          return (
            <Image
              style={{
                width: size,
                height: size,
                tintColor: focused ? colors.primary : colors.accent,
                transform: [{ translateY: lift }],
                shadowColor: focused ? colors.accent : 'transparent',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: focused ? 0.22 : 0,
                shadowRadius: focused ? 9 : 0,
                elevation: focused ? 6 : 0,
              }}
              source={icons[route.name]}
              resizeMode="contain"
            />
          );
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.input,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 64,
          paddingBottom: 30,
          marginHorizontal: 40,
          marginBottom: 12,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: colors.accent,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.appBg,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          height: 50,
        },
        headerTitleStyle: {
          fontFamily: 'Lato-Bold',
          fontSize: fonts.head.primary,
          color: colors.textPrimary,
        },
        headerTitleAlign: 'left',
        headerShadowVisible: false,
        headerLeft: () => null,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Reports" component={Report} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

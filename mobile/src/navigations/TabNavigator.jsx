import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile.jsx';
import TabBar from '../components/TabBar.jsx';
import { fonts } from '../constants/fontSize.js';
import { useTheme } from '../context/Theme.context.js';
import HomeStackNav from './HomeStackNav.jsx';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const colors = useTheme();
  return (
    <Tab.Navigator
    initialRouteName='HomeStack'
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.appBg,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          shadowColor: 'transparent',
        },
        headerTitleStyle: {
          fontFamily: 'Lato-Bold',
          fontSize: fonts.head.secondary.dark,
          color: colors.textPrimary,
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNav}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

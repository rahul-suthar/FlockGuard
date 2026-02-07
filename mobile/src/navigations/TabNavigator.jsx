import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile.jsx';
import TabBar from '../components/TabBar.jsx';
import Vet from '../screens/Vet.jsx';
import HomeStackNav from './HomeStackNav.jsx';
import { colors } from '../constants/colors.js';
import { fonts } from '../constants/fontSize.js';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        name="Home"
        component={HomeStackNav}
        options={{
          headerShown: false,
          iconName: 'home',
        }}
      />
      <Tab.Screen
        name="Vet"
        component={Vet}
        options={{
          iconName: 'medkit',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          iconName: 'person',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

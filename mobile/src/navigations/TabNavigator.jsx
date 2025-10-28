import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile.jsx';
import TabBar from '../components/TabBar.jsx';
import Game from '../screens/Game.jsx';
import Vet from '../screens/Vet.jsx';
import { fonts } from '../constants/fontSize.js';
import { useTheme } from '../context/Theme.context.js';
import HomeStackNav from './HomeStackNav.jsx';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const colors = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
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
        options={{
          headerShown: false,
          iconName: 'home',
        }}
      />
      <Tab.Screen
        name="Vets"
        component={Vet}
        options={{
          iconName: 'medkit',
        }}
      />
      <Tab.Screen
        name="Game"
        component={Game}
        options={{
          iconName: 'game-controller',
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

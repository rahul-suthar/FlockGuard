import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile.jsx';
import TabBar from '../components/TabBar.jsx';
import Vet from '../screens/Vet.jsx';
import HomeStackNav from './HomeStackNav.jsx';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNav}
        options={{
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

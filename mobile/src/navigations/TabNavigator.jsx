import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home.jsx';
import Report from '../screens/Report.jsx';
import Profile from '../screens/Profile.jsx';
import TabBar from '../components/TabBar.jsx'
import { colors } from '../constants/colors.js';
import { fonts } from '../constants/fontSize.js';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.appBg,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontFamily: 'Lato-Bold',
          fontSize: fonts.head.secondary.dark,
          color: colors.textPrimary,
        },
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Reports" component={Report} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

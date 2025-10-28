import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home.jsx';
import Details from '../screens/Details.jsx';
import { fonts } from '../constants/fontSize.js';
import { useTheme } from '../context/Theme.context.js';
import { useAuth } from '../context/Auth.context.js';

const HomeStack = createNativeStackNavigator();

const HomeStackNav = () => {
  const colors = useTheme();
  const { user } = useAuth();
  const fName = user.name.split(' ')[0];
  const displayName = fName.charAt(0).toUpperCase() + fName.slice(1);
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.appBg,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          shadowColor: 'transparent',
        },
        headerTitleStyle: {
          fontFamily: 'Lato-Bold',
          fontSize: fonts.head.secondary.dark,
        },
        headerTintColor: colors.textPrimary,
        headerShadowVisible: false,
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ title: `Welcome ${displayName},` }}
      />
      <HomeStack.Screen
        name="Details"
        component={Details}
        options={({ route }) => ({
          title: route.params.item.name,
        })}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNav;

const styles = StyleSheet.create({});

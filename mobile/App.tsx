import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigations/StackNavigator.jsx';
import TabNavigator from './src/navigations/TabNavigator.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, useAuth } from './src/context/AuthContext.js';
import { PopupProvider, usePopup } from './src/context/PopupContext.js';
import Popup from './src/components/Popup.jsx';
import { colors } from './src/constants/colors.js';

const MainApp = () => {
  const { user, setUser } = useAuth();
  const { popup } = usePopup();
  const theme = useColorScheme();
  const barStyle = theme === 'light' ? 'dark-content' : 'light-content';

  useEffect(() => {
    const fetchUser = async () => {
      const userString = await AsyncStorage.getItem('user');
      setUser(userString ? JSON.parse(userString) : null);
    };
    fetchUser();
  }, [setUser]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={barStyle} />
      <NavigationContainer>
        {user
          ? <TabNavigator />
          : <StackNavigator />
        }
      </NavigationContainer>
      {popup.show && <Popup data={popup.data} />}
    </View>
  )
}

const App = () => {
  return (
    <PopupProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </PopupProvider>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.appBg,
  }
})
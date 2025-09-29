import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigations/StackNavigator.jsx';
import TabNavigator from './src/navigations/TabNavigator.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from './src/screens/Splash.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/context/AuthContext.js';
import { PopupProvider, usePopup } from './src/context/PopupContext.js';
import Popup from './src/components/Popup.jsx';

const MainApp = () => {
  const { user, setUser } = useAuth();
  const { popup } = usePopup();
  const [loading, setLoading] = useState(true);
  const theme = useColorScheme();
  const barStyle = theme === 'light' ? 'dark-content' : 'light-content';

  useEffect(() => {
    const fetchUser = async () => {
      const userString = await AsyncStorage.getItem('user');
      setUser(userString ? JSON.parse(userString) : null);
      setLoading(false);
    };
    fetchUser();
  }, [setUser]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={barStyle} />
      {loading ? <Splash /> :
        <NavigationContainer>
          {user
            ? <TabNavigator />
            : <StackNavigator />
          }
        </NavigationContainer>
      }
      {popup.show && <Popup data={popup.data} />}
    </SafeAreaView>
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
    justifyContent: "center",
    position: 'relative',
  }
})
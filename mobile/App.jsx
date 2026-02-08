import {
  Modal,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigations/StackNavigator.jsx';
import TabNavigator from './src/navigations/TabNavigator.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider, useAuth } from './src/context/Auth.context.js';
import { PopupProvider, usePopup } from './src/context/Popup.context.js';
import { LoaderProvider, useLoader } from './src/context/Loader.context.js';
import { ThemeProvider, useTheme } from './src/context/Theme.context.js';
import Popup from './src/components/Popup.jsx';
import GlobalLoader from './src/components/Loader.jsx';
import CameraView from './src/components/CameraView.jsx';
import { CameraProvier, useCamera } from './src/context/Camera.context.js';
import { HealthProvider } from './src/context/Health.context.js';

const MainApp = () => {
  const { user, setUser } = useAuth();
  const { popup } = usePopup();
  const { showLoad } = useLoader();
  const theme = useColorScheme();
  const colors = useTheme();
  const barStyle = theme === 'light' ? 'dark-content' : 'light-content';

  const { showCamera, closeCamera, onPhotoTaken } = useCamera();

  useEffect(() => {
    const fetchUser = async () => {
      const userString = await AsyncStorage.getItem('user');
      setUser(userString ? JSON.parse(userString) : null);
    };
    fetchUser();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.appBg }]}>
      <StatusBar barStyle={barStyle} />
      <NavigationContainer>
        {user ? <TabNavigator /> : <StackNavigator />}
      </NavigationContainer>
      {showLoad.show && <GlobalLoader />}
      {popup.show && <Popup data={popup.data} />}
      <Modal visible={showCamera} animationType="slide" transparent={false}>
        <CameraView
          onPhotoTaken={photo => {
            onPhotoTaken(photo);
            closeCamera();
          }}
          onClose={closeCamera}
        />
      </Modal>
    </View>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <PopupProvider>
        <AuthProvider>
          <LoaderProvider>
            <HealthProvider>
              <CameraProvier>
                <MainApp />
              </CameraProvier>
            </HealthProvider>
          </LoaderProvider>
        </AuthProvider>
      </PopupProvider>
    </ThemeProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

import {
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { useEffect, useRef, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../constants/colors';

const CameraView = ({ onPhotoTaken, onClose }) => {
  const camera = useRef(null);
  const [flash, setFlash] = useState('off');

  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    if (hasPermission === 'not-determined' || 'denied') {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const capturePicture = async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto({ flash });
        if (onPhotoTaken) {
          onPhotoTaken(photo);
        }
      } catch (err) {
        Alert.alert('Capture failed', err.message);
      }
    }
  };

  if (hasPermission === 'not-determined' || !device) {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          },
        ]}
      >
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          },
        ]}
      >
        <Ionicons size={48} name="alert-circle-outline" color="#fff" />
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Ionicons size={30} name="close" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={StyleSheet.absoluteFill}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <TouchableOpacity style={styles.captureBtn} onPress={capturePicture}>
        <Ionicons size={36} name="camera" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Ionicons size={30} name="close" />
      </TouchableOpacity>
    </View>
  );
};

export default CameraView;

const styles = StyleSheet.create({
  captureBtn: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    marginLeft: -32,
    width: 72,
    height: 72,
    backgroundColor: '#fff',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  closeBtn: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    backgroundColor: '#fff',
    borderRadius: 16,
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
});

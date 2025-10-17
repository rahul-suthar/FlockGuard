import { createContext, useContext, useState } from 'react';

const CameraContext = createContext();

export const useCamera = () => useContext(CameraContext);

export const CameraProvier = ({ children }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [onPhotoTaken, setOnPhotoTaken] = useState(() => () => {});

  const openCamera = callback => {
    setOnPhotoTaken(() => callback);
    setShowCamera(true);
  };

  const closeCamera = () => setShowCamera(false);

  return (
    <CameraContext.Provider
      value={{ showCamera, openCamera, closeCamera, onPhotoTaken }}
    >
      {children}
    </CameraContext.Provider>
  );
};

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { BACKEND_HEALTH_URL, ML_HEALTH_URL } from '@env'; 
import { usePopup } from './Popup.context';
import { useLoader } from './Loader.context';

const HealthContext = createContext();

export const HealthProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [isWakingUp, setIsWakingUp] = useState(false);
  const { showPopup } = usePopup();
  const { setShowLoad } = useLoader();

  const checkHealth = useCallback(async (isManual = false) => {
    if (isManual) setShowLoad({ show: true, msg: 'Waking up Services...' });
    setIsWakingUp(true);

    try {
      const [backendRes, mlRes] = await Promise.all([
        fetch(BACKEND_HEALTH_URL).catch(() => ({ ok: false })),
        fetch(ML_HEALTH_URL).catch(() => ({ ok: false }))
      ]);

      if (backendRes.ok && mlRes.ok) {
        setIsReady(true);
        if (isManual) showPopup({ success: true, msg: 'All services are Online' });
      } else {
        setIsReady(false);
        if (isManual) showPopup({ success: false, msg: 'ML Service still warming up...' });
      }
    } catch (e) {
      setIsReady(false);
    } finally {
      setIsWakingUp(false);
      if (isManual) setShowLoad({ show: false, msg: '' });
    }
  }, [setShowLoad, showPopup]);

  useEffect(() => {
    checkHealth();
    const interval = setInterval(() => checkHealth(), 14 * 60 * 1000);
    return () => clearInterval(interval);
  }, [checkHealth]);

  return (
    <HealthContext.Provider value={{ isReady, isWakingUp, checkHealth }}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => useContext(HealthContext);
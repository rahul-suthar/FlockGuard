import { createContext, useCallback, useContext, useState } from 'react';

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useState({ show: false, data: {} });

  const showPopup = useCallback(data => {
    setPopup({ show: true, data });
    setTimeout(() => setPopup({ show: false, data: {} }), 1800);
  }, []);

  return (
    <PopupContext.Provider value={{ popup, showPopup }}>
      {children}
    </PopupContext.Provider>
  );
};

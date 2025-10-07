import { createContext, useContext, useState } from 'react';

const LoaderContext = createContext();

export const useLoader = () => useContext(LoaderContext);

export const LoaderProvider = ({ children }) => {
  const [showLoad, setShowLoad] = useState({show: false, msg: ''});

  return (
    <LoaderContext.Provider value={{ showLoad, setShowLoad }}>
      {children}
    </LoaderContext.Provider>
  );
};

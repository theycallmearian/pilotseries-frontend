import React, { createContext, useContext } from 'react';
import { useToast } from '@chakra-ui/react';

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const toast = useToast();
  const showError = (description, title = 'Error') => {
    toast({
      title,
      description,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };
  const showSuccess = (description, title = 'Listo') => {
    toast({
      title,
      description,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <AlertContext.Provider value={{ showError, showSuccess }}>
      {children}
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);

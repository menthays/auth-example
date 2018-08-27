import { createContext } from 'react';
import { localStorage as storage } from '../utils/storage';

const initialState = {
  username: storage.read('username') || '',
  token: storage.read('token') || '',
  isAuthenticated: storage.read('isAuthenticated') || false,
  isAuthenticating: false
};

const context = createContext(initialState);

export { initialState, context };

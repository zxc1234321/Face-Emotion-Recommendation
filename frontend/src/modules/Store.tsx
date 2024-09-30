import { createStore } from 'redux';
import rootReducer from './Reducers';

const savedDarkMode = localStorage.getItem('darkMode');
const initialState = {
  darkMode: savedDarkMode === 'true',
  emotionResult: null,
};

const store = createStore(rootReducer, initialState);

export default store;

import { TOGGLE_DARK_MODE, SET_EMOTION_RESULT, AppActions } from './Actions';

interface AppState {
  darkMode: boolean;
  emotionResult: string | null;
}

const initialState: AppState = {
  darkMode: false,
  emotionResult: null,
};

const rootReducer = (
  state: AppState = initialState,
  action: AppActions
): AppState => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case SET_EMOTION_RESULT:
      return {
        ...state,
        emotionResult: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;

export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE';
export const SET_EMOTION_RESULT = 'SET_EMOTION_RESULT';

interface ToggleDarkModeAction {
  type: typeof TOGGLE_DARK_MODE;
}

interface SetEmotionResultAction {
  type: typeof SET_EMOTION_RESULT;
  payload: string;
}

export type AppActions = ToggleDarkModeAction | SetEmotionResultAction;

export const toggleDarkMode = (): ToggleDarkModeAction => ({
  type: TOGGLE_DARK_MODE,
});

export const setEmotionResult = (
  emotionResult: string
): SetEmotionResultAction => ({
  type: SET_EMOTION_RESULT,
  payload: emotionResult,
});

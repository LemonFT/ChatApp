import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ThemeState {
  name: 'light' | 'dark' | '';
};

const initialState: ThemeState = {
  name: '',
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      changeTheme(state, action: PayloadAction<ThemeState>) {
        state.name = action.payload.name;
      },
    }
});

export const { changeTheme } = themeSlice.actions;

export const themeSelected = (state: any) => state.theme;

const themeReducer = themeSlice.reducer;
export default themeReducer;
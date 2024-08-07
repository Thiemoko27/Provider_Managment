import { configureStore, createSlice } from "@reduxjs/toolkit";

//Création du slice afin de gérer  l'état du thème
const themeSlice = createSlice({
    name: 'theme',
    initialState: 'light',
    reducers:  {
        toogleTheme(state) {
            return state === 'light' ? 'dark' : 'light'
        }
    }
})

//exportation des actions génératives du slice
export const { toogleTheme } = themeSlice.actions

//Création du store avec le slice
const store = configureStore({
    name: 'theme',
    reducer: {
        theme: themeSlice.reducer
    }
})

export default store
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const LOCSTORAGE_FK = 'konsin1988'

interface GithubState {
    favourites: string[]
}

const initialState: GithubState = {
    favourites: JSON.parse(localStorage.getItem(LOCSTORAGE_FK) ?? '[]')
}

export const githubSlice = createSlice({
    name: 'github', 
    initialState,
    reducers: {
        addFavourite(state, action: PayloadAction<string>) {
            state.favourites.push(action.payload)
            localStorage.setItem(LOCSTORAGE_FK, JSON.stringify(state.favourites))
        },
        removeFavourite(state, action: PayloadAction<string>) {
            state.favourites = state.favourites.filter(f => f !== action.payload)
            localStorage.setItem(LOCSTORAGE_FK, JSON.stringify(state.favourites))
        }
    }
})

export const githubActions = githubSlice.actions
export const githubReducer = githubSlice.reducer
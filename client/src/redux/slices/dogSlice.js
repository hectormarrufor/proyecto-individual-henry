import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dogs: [],
    weights: {
        minimum: 6,
        maximum: 200,
        light: [6, 22],
        medium: [22, 55],
        heavy: [55, 200]
    },
    heights: {
        minimum: 9,
        maximum: 35,
        small: [9, 16],
        average: [16, 22],
        tall: [22, 35],
    },
    temperaments: []
}

export const dogSlice = createSlice({
    name: 'dogReducer',
    initialState,
    reducers: {
        insert: (state, action) => {
         state.dogs = action.payload;
        },
        setTemperamentsOnStore: (state, action) => {
            state.temperaments = action.payload;
        }
       
    },
});

// Action creators are generated for each case reducer function
export const { insert , setTemperamentsOnStore} = dogSlice.actions

export default dogSlice.reducer
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dogs: [],
    backup: [],
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
        insert_replacing: (state, action)=>{
            action.payload?.forEach(dog => {
                
                let indexDogFromState = state.dogs.findIndex(stateDog => stateDog.id === dog.id);
                if (indexDogFromState === -1){
                    state.dogs.push(dog);
                }
                else {
                    if (!state.backup.find(dog => dog.id === state.dogs[indexDogFromState].id) && state.dogs[indexDogFromState].comesFrom === 'API') state.backup.push(state.dogs[indexDogFromState]);
                    state.dogs[indexDogFromState] = dog;
                }
            })
        },
        setTemperamentsOnStore: (state, action) => {
            state.temperaments = action.payload;
        },
        restore_dog_from_api: (state, action)=> {
            let id = action.payload;
            let selectedDogIndex = state.dogs.findIndex(dog => dog.id === id);
            let selectedBackupIndex = state.backup.findIndex(dog => dog.id === id);
            state.dogs[selectedDogIndex] = state.backup[selectedBackupIndex];
            state.backup.splice(selectedBackupIndex, 1)
        }
       
    },
});

// Action creators are generated for each case reducer function
export const { insert , setTemperamentsOnStore, insert_replacing, restore_dog_from_api} = dogSlice.actions

export default dogSlice.reducer
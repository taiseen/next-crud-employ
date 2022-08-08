import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    client: { toggleFrom: false }
}

export const ReducerSlice = createSlice({
    name: 'crudApp',
    initialState,
    reducers: {
        toggleChangeAction: (state) => {
            state.client.toggleFrom = !state.client.toggleFrom;
        }
    }
})

export const { toggleChangeAction } = ReducerSlice.actions;

export default ReducerSlice.reducer;
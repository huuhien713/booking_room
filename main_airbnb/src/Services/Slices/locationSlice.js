import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import locationApi from '../Api/locationApi'

const initialState = {
    isLoading : false,
    messageError: null,
    allLocation : [],
    locationById : null
}

export const getAllLocation = createAsyncThunk(
    'location/getAllLocation',
    async () => {
        try {
            const {data} = await locationApi.getAllLocation();
            return data.content;
        } catch (error) {
            throw(error)
        }
    }
);

export const getLocationById = createAsyncThunk(
    'location/getLocationById',
    async (id) => {
        try {
            const {data} = await locationApi.getLocationById(id);
            return data.content;
        } catch (error) {
            throw(error)
        }
    }
);


const locationSlice = createSlice({
    name : 'location',
    initialState,
    reducers : {

    }, 
    extraReducers : (builder) => {
        builder.addCase(getAllLocation.pending, (state) => {
            return {...state, isLoading: true}
        });
        builder.addCase(getAllLocation.fulfilled, (state, action) => {
            return {...state, isLoading: false, allLocation: action.payload}
        });
        builder.addCase(getAllLocation.rejected, (state, action) => {
            return {...state, isLoading: false, messageError: action.error}
        });

        builder.addCase(getLocationById.pending, (state) => {
            return {...state, isLoading: true}
        });
        builder.addCase(getLocationById.fulfilled, (state, action) => {
            return {...state, isLoading: false, locationById: action.payload}
        });
        builder.addCase(getLocationById.rejected, (state, action) => {
            return {...state, isLoading: false, messageError: action.error}
        });
    }
})

export const {} = locationSlice.actions;
export default locationSlice.reducer;
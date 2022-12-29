import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import bookingApi from "../Api/bookingApi";

const initialState = {
    isLoading : false,
    messageError: null,
    isBook: false,
    listBookingById : []
}


export const getListBookingById = createAsyncThunk(
    'booking/getListBookingById',
    async (model) => {
        try {
            const {data} = await bookingApi.getListBookingById(model)
            return data.content;
        } catch (error) {
            throw(error);
        }
    }
)

export const bookingRoom = createAsyncThunk(
    'booking/bookingRoom',
    async (model) => {
        const data = await bookingApi.bookingRoom(model)
        .then((res) => {
            console.log(res.data.content);
            return res.data.content;
        })
        .catch(error => console.log(error));
    }
)

const bookingSlice = createSlice({
    name : 'booking',
    initialState,
    reducers: {
        setIsBook : (state) => {
            return {...state, isBook: false}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(bookingRoom.pending, (state) => {
            return {...state, isLoading: true};
        });
        builder.addCase(bookingRoom.fulfilled, (state, action) => {
            return {...state, isLoading: false, isBook : true};
        });
        builder.addCase(bookingRoom.rejected, (state, action) => {
            return {...state, isLoading: false, messageError: action.error};
        });

        builder.addCase(getListBookingById.pending, (state) => {
            return {...state, isLoading: true};
        });
        builder.addCase(getListBookingById.fulfilled, (state, action) => {
            return {...state, isLoading: false, listBookingById : action.payload};
        });
        builder.addCase(getListBookingById.rejected, (state, action) => {
            return {...state, isLoading: false, messageError: action.error};
        });
    }
});

export const {setIsBook} = bookingSlice.actions;
export default bookingSlice.reducer;
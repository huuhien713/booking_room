import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentsAPI from "../services/commentAPI";

const initialState = {
    comments : [],
    loading: false,
    error: null,
}

export const getComments = createAsyncThunk(
    "comments/getComments",
    async () => {
        try {
            const data = await commentsAPI.getComments();
            return data;
        } catch (error) {
            throw error;
        }
    }
)

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getComments.pending, (state,action) => {
            return {...state, loading: true};
        });
        builder.addCase(getComments.fulfilled, (state, action) => {
            return {...state, loading: false, comments: action.payload};
        });
        builder.addCase(getComments.rejected, (state,action) => {
            return {...state, loading: false, error: action.error.message};
        });
    }
})


export default commentsSlice.reducer;
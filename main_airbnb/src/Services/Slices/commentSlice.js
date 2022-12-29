import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import commentApi from '../Api/commentApi'

const initialState = {
    isLoading: false,
    messageError: null,
    allComment: [],
    isComment: false
}

export const getAllComment = createAsyncThunk(
    'comment/getAllComment',
    async () => {
        try {
            const { data } = await commentApi.getAllComment();
            return data.content;
        } catch (error) {
            throw(error);
        }
    }
)

export const sendComment = createAsyncThunk(
    'comment/sendComment',
    async (model) => {
        try {
            const { data } = await commentApi.sendComment(model);
            return data.content;
        } catch (error) {
            throw(error);
        }
    }
)

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setIsComment : (state) => {
            return {...state, isComment: false};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllComment.pending, (state) => {
            return {...state, isLoading: true};
        });
        builder.addCase(getAllComment.fulfilled, (state, action) => {
            return {...state, isLoading: false, allComment: action.payload};
        });
        builder.addCase(getAllComment.rejected, (state, action) => {
            return {...state, isLoading: false, messageError: action.error};
        });

        builder.addCase(sendComment.pending, (state) => {
            return {...state, isLoading: true};
        });
        builder.addCase(sendComment.fulfilled, (state, action) => {
            return {...state, isLoading: false, isComment: true};
        });
        builder.addCase(sendComment.rejected, (state, action) => {
            return {...state, isLoading: false, messageError: action.error};
        });
    }
})

export const { setIsComment } = commentSlice.actions;
export default commentSlice.reducer;
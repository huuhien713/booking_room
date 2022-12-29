import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../Api/userApi";

const initialState = {
    isLoading: false,
    messageError: null,
    isUpdate: false,
    allAccount: [],
    account: null,
}

export const getAllAccount = createAsyncThunk(
    'user/getAllAccount',
    async ( _, {rejectWithValue}) => {
        try {
            const {data} = await userApi.getAllAccount();
            return data.content;
        } catch (error) {
            return rejectWithValue(error)
            // throw(error)
        }
    }
)

export const getUserById = createAsyncThunk(
    'user/getUserById',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await userApi.getUserById(id);
            return data.content;
        } catch (error) {
            return rejectWithValue(error)
            // throw(error)
        }
    }
)

export const updateUser = createAsyncThunk(
    'user/update',
    async (model, {rejectWithValue}) => {
        try {
            const {data} = await userApi.updateUser(model);
            return data.content;
        } catch (error) {
            return rejectWithValue(error)
            // throw(error)
        }
    }
)

export const updateAvatarUser = createAsyncThunk(
    'user/updateAvatarUser',
    async (file, {rejectWithValue}) => {
        try {
            const {data} = await userApi.updateAvatarUser(file);
            return data.content;
        } catch (error) {
            return rejectWithValue(error)
            // throw(error)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsUpdate : (state) => {
            return {...state, isUpdate: false}
        },
        setMessageError: (state) => {
            return {...state, messageError: null}
        }

    }, 
    extraReducers: (builder) => {
        builder.addCase(getAllAccount.pending, (state) => {
            return {...state, isLoading: true};
        });
        builder.addCase(getAllAccount.fulfilled, (state, action) => {
            return {...state, isLoading: false, allAccount: action.payload};
        });
        builder.addCase(getAllAccount.rejected, (state, action) => {
            return {...state, isLoading: false, messageError: action?.payload?.response?.data?.content};
        });

        builder.addCase(getUserById.pending, (state) => {
            return {...state, isLoading: true};
        });
        builder.addCase(getUserById.fulfilled, (state, action) => {
            return {...state, isLoading: false, account: action.payload};
        });
        builder.addCase(getUserById.rejected, (state, action) => {
            return {...state, isLoading: false, messageError: action?.payload?.response?.data?.content};
        });

        builder.addCase(updateUser.pending, (state) => {
            return {...state, isLoading: true};
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            return {...state, isLoading: false, isUpdate: true, account: action.payload};
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            return {...state, isLoading: false, messageError: action?.payload?.response?.data?.content};
        });

        builder.addCase(updateAvatarUser.pending, (state) => {
            return {...state, isLoading: true};
        });
        builder.addCase(updateAvatarUser.fulfilled, (state, action) => {
            return {...state, isLoading: false, isUpdate: true, account: action.payload};
        });
        builder.addCase(updateAvatarUser.rejected, (state, action) => {
            return {...state, isLoading: false, messageError: action?.payload?.response?.data?.content};
        });
    }
})

export const {setIsUpdate, setMessageError} = userSlice.actions;
export default userSlice.reducer;
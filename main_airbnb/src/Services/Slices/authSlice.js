import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import authApi from '../Api/authApi'

const initialState = {
    isLoading: false,
    messageError: null,
    user: JSON.parse(localStorage.getItem('userBooking')) || null,
    isSignup: false,
}

export const signin = createAsyncThunk(
    'auth/signin',
    async (model, {rejectWithValue}) => {
        try {
            const {data} = await authApi.signin(model);
            localStorage.setItem('userBooking', JSON.stringify(data.content));
            return data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const signup = createAsyncThunk(
    'auth/signup',
    async (model, {rejectWithValue}) => {
        try {
            const {data} = await authApi.signup(model);
            return data.content;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSignUp : (state) => {
            return {...state, isSignup: false};
        },
        setMessageError : (state) => {
            return {...state, messageError: null};
        }, 
        logout : (state) => {
            return {...state, user: null};
        }
    },
    extraReducers: (builder) => { 
        builder.addCase(signin.pending, (state) => {
            return {...state, isLoading: true};
        });
        builder.addCase(signin.fulfilled, (state, action) => {
            return {...state, isLoading: false, user: action.payload};
        });
        builder.addCase(signin.rejected, (state, action) => {
            console.log(action);
            return {...state, isLoading: false, messageError: action.payload.response.data.content};
        });

        builder.addCase(signup.pending, (state) => {
            return {...state, isLoading: true};
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            return {...state, isLoading: false, isSignup: true};
        });
        builder.addCase(signup.rejected, (state, action) => {
            // console.log(action.payload.response.data.content);
            return {...state, isLoading: false, messageError: action.payload.response.data.content};
        });
    }
});


export const {setSignUp, setMessageError, logout} = authSlice.actions;
export default authSlice.reducer;
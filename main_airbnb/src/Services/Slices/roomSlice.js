import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import roomApi from '../Api/roomApi'

const initialState = {
    allRoom: [],
    roomByLocation: [],
    roomById: null, 
    isLoading: false,
    messageError: null,
    infoBooking: null
}

export const getAllRoom = createAsyncThunk(
    'location/getAllRoom',
    async () => {
        try {
            const {data} = await roomApi.getAllRoom();
            return data.content;
        } catch (error) {
            throw(error)
        }
    }
)

export const getRoomByLocation = createAsyncThunk(
    'location/getRoomByLocation',
    async (maViTri) => {
        try {
            const {data} = await roomApi.getRoomByLocation(maViTri);
            return data.content;
        } catch (error) {
            throw(error)
        }
    }
)

export const getRoomById = createAsyncThunk(
    'location/getRoomById',
    async (id) => {
        try {
            const {data} = await roomApi.getRoomById(id);
            return data.content;
        } catch (error) {
            throw(error)
        }
    }
)

const roomSlice = createSlice({
    name : 'room',
    initialState,
    reducers : {
        chonPhong : (state, info) => {
            return {...state, infoBooking : info.payload}
        },
        setInfoBooking : (state) => {
            return {...state, infoBooking : null}
        }
    }, 
    extraReducers : (builder) => {
        builder.addCase(getAllRoom.pending, (state) => {
            return {...state, isLoading: true}
        });
        builder.addCase(getAllRoom.fulfilled, (state, action) => {
            return {...state, isLoading: false, allRoom: action.payload}
        });
        builder.addCase(getAllRoom.rejected, (state, action) => {
            return {...state, isLoading: false, messageError: action.error}
        });

        builder.addCase(getRoomByLocation.pending, (state) => {
            return {...state, isLoading: true}
        });
        builder.addCase(getRoomByLocation.fulfilled, (state, action) => {
            return {...state, isLoading: false, roomByLocation: action.payload}
        });
        builder.addCase(getRoomByLocation.rejected, (state, action) => {
            return {...state, isLoading: false, messageError: action.error}
        });

        builder.addCase(getRoomById.pending, (state) => {
            return {...state, isLoading: true}
        });
        builder.addCase(getRoomById.fulfilled, (state, action) => {
            return {...state, isLoading: false, roomById: action.payload}
        });
        builder.addCase(getRoomById.rejected, (state, action) => {
            return {...state, isLoading: false, messageError: action.error}
        });
    }
});

export const {chonPhong, setInfoBooking} = roomSlice.actions;
export default roomSlice.reducer;
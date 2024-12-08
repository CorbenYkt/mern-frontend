import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
});

export const fetchRegister = createAsyncThunk(
    'auth/fetchRegister',
    async (params, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('auth/register', params);
            return data;
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMessages = error.response.data.map((err) => err.msg).join(', ');
                return rejectWithValue(errorMessages);
            }
            return rejectWithValue(error.message || 'An unexpected error occurred');
        }
    }
);


const initialState = {
    data: null,
    status: 'loading',
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            state.status = 'loaded';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = 'loading';
                state.data = null;
                state.error = null;
            })
            .addCase(fetchAuth.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.status = 'error';
                state.data = null;
                state.error = 'Login failed';
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading';
                state.data = null;
                state.error = null;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.status = 'error';
                state.data = null;
                state.error = 'Failed to fetch user data';
            })
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
                state.data = null;
                state.error = null;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.status = 'loaded';
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.status = 'error';
                state.data = null;
                state.error = action.payload;
            });
    },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const selectUserData = (state) => state.auth.data;
export const selectAuthError = (state) => state.auth.error;
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
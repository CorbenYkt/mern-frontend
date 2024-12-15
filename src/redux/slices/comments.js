import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async (postId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/comments/${postId}`);
            return response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addComment = createAsyncThunk(
    "comments/addComment",
    async ({ postId, commentText, userId, token }, { rejectWithValue }) => {
        try {
            await axios.post(
                `/comments/${postId}`,
                { commentText, userId, postId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const response = await axios.get(`/comments/${postId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteComment = createAsyncThunk(
    "comments/deleteComment",
    async ({ commentId, postId, token }, { rejectWithValue }) => {
        try {
            await axios.delete(`/comments/${commentId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const response = await axios.get(`/comments/${postId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        items: [],
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(addComment.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(addComment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.error = action.payload;
            });

    },
});

export const commentsReducer = commentsSlice.reducer;

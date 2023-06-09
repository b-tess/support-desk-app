import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './noteService'

const initialState = {
    notes: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

//Get a ticket's notes
export const getNotes = createAsyncThunk(
    'notes/getAll',
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await noteService.getNotes(ticketId, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Create a ticket's notes
export const createNote = createAsyncThunk(
    'notes/createOne',
    async ({ ticketId, noteText }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await noteService.createNote(ticketId, noteText, token)
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Create the slice
export const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        reset: (state) => initialState, //Re-initialize the initial state when this action/func is called
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notes = action.payload
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(createNote.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.notes.push(action.payload)
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = noteSlice.actions
export default noteSlice.reducer

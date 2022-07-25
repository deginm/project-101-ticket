import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import ticketServices from './ticketSevices'

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}
// get error message from error object 
const getErrorMessage = (error) => {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return message
}

export const createTicket = createAsyncThunk("ticket/create",
    async (ticket, thunkApi) => {
        const usertoken = thunkApi.getState().auth.user.token
        try {
            return await ticketServices.createTicket(ticket, usertoken)
        } catch (error) {
            const message = getErrorMessage(error)
            return thunkApi.rejectWithValue(message)
        }
    })

export const getAllTickets = createAsyncThunk("tickets/get",
    async (_, thunkApi) => {
        const usertoken = thunkApi.getState().auth.user.token
        try {
            return await ticketServices.getTickets(usertoken)
        } catch (error) {
            const message = getErrorMessage(error)
            return thunkApi.rejectWithValue(message)
        }
    })

export const getTicket = createAsyncThunk("ticket/get",
    async (ticketId, thunkApi) => {
        const usertoken = thunkApi.getState().auth.user.token;
        try {
            return await ticketServices.getTicket(ticketId, usertoken)
        } catch (error) {
            const message = getErrorMessage(error)
            return thunkApi.rejectWithValue(message)
        }
    }
)

const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTicket.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createTicket.rejected, (state, actions) => {
                state.isError = true
                state.isSuccess = false
                state.message = actions.payload
            })
            .addCase(getAllTickets.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllTickets.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tickets = action.payload
            })
            .addCase(getAllTickets.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
            .addCase(getTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.ticket = action.payload
            })
            .addCase(getTicket.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.message = action.payload
            })
    }
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer
import { createSlice } from '@reduxjs/toolkit';
import { updateUserDetails } from './authThunk';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        token: null,
        error: null,
        basicUser: null, // after login
        userDetails: null, // after getUserDetails
    },
    reducers: {
        signInStart(state) {
            state.loading = true;
            state.error = null;
        },
        signInSuccess(state, action) {
            state.loading = false;
            state.user = action.payload; // Ensure this matches your API response structure
            state.token = action.payload.token; // Ensure this matches your API response structure
        },
        signInFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            const { token, user } = action.payload; // Ensure this matches your API response structure
            state.token = token;
            if (user) {
                state.user = user; // This should be the correct user object
            } else {
                console.warn('No user data returned in login response');
                state.user = null; // Set to null or handle as needed
            }
            state.loading = false;
            state.error = null;
            state.basicUser = action.payload.user;
        },
        loginFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.basicUser = null;    // also clear basicUser if used
            state.userDetails = null;
            state.loading = false;
            state.error = null;
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserDetails.fulfilled, (state, action) => {
                state.loading = false;
                const updatedUserResponse = action.payload; // { success, message, user }

                if (updatedUserResponse && updatedUserResponse.user) {
                    const updatedUser = updatedUserResponse.user;

                    // Merge user data and preserve wallet if missing in updatedUser
                    state.user = {
                        ...state.user,  // keep old user data
                        ...updatedUser, // overwrite with updated fields
                        wallet: updatedUser.wallet ?? state.user.wallet, // preserve wallet if missing
                    };

                    state.basicUser = {
                        ...state.basicUser,
                        ...updatedUser,
                        wallet: updatedUser.wallet ?? state.basicUser?.wallet,
                    };

                    state.userDetails = {
                        ...state.userDetails,
                        ...updatedUser,
                        wallet: updatedUser.wallet ?? state.userDetails?.wallet,
                    };

                } else {
                    console.warn('⚠️ No updated user returned in updateUserDetails response');
                }
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});


export const {
    signInStart,
    signInSuccess,
    signInFailure,
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    setUserDetails
} = authSlice.actions;

export default authSlice.reducer;

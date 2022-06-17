import { createSlice } from "@reduxjs/toolkit";
import { isNotEmpty } from "../utils";



const authStore = createSlice({
    name: 'authStore',
    initialState: {},
    reducers: {
        addUser(state) {

            //@ts-ignore
            const userData = JSON.parse(localStorage.getItem('user'));


            if (!isNotEmpty(userData)) {
                return;
            }
            const { user, token } = userData;
            //@ts-ignore
            state.user = user;
            //@ts-ignore
            state.token = token;




        },
        logout(state) {

            //@ts-ignore
            delete state.user;
            //@ts-ignore
            delete state.token;;
        }
    }
});


export const { addUser, logout } = authStore.actions;

export default authStore.reducer;
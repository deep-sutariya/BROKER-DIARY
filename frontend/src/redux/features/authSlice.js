import { createSlice } from "@reduxjs/toolkit";

let user = {};

export const auth = createSlice({
    name: "auth",
    initialState: user,
    reducers:{
        logOut: ()=>{
            user = {};
            console.log("LogOut from Slice");
            return user;
        },
        
        logIn: (state,action)=>{
            user = action.payload;
            console.log(user);
            return user;
        }
    }
})

export const {logOut,logIn} = auth.actions;
export default auth.reducer;
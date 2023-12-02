import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Dube Dincan" },
  { id: "1", name: "Paul Shawn" },
  { id: "2", name: "Tyler Perkson" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;

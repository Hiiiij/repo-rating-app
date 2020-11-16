// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { request as octoReq } from '@octokit/request';

// const initialState = {};

// export const fetchMyStarsMiddleware = createAsyncThunk(
//   'stars/get',
//   async (opts, thunkAPI) => {
//     const res = await octoReq('GET /search/repositories', opts);

//     return res;
//   }
// );

// const starsSlice = createSlice({
//   name: 'stars',
//   initialState,
//   reducers: {},
//   extraReducers: {
//     [fetchMyStarsMiddleware.fullfiled]: (state, action) => {
//       console.log(state, action);
//     },
//   },
// });

// export const { request, success } = starsSlice.actions;
// export default starsSlice.reducer;

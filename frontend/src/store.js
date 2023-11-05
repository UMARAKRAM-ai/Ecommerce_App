import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import cartSliceReducer from './slices/cartSlice';
import loginSliceReducer from './slices/loginSlice';


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart:cartSliceReducer,
    login:loginSliceReducer,
  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;






// import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "./slices/apiSlice";

// const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
//   devTools: true,
// });

// export default store;


// Code which mirza has sent

// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
// import { apiSlice } from './slices/apiSlice';
// // import { productsApiSlice } from './slices/productsApiSlice'


// const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
  
//   },
//   middleware: getDefaultMiddleware().concat(apiSlice.middleware, ),
//   devTools: true,
// })

// export default store;
import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import pizzasReducer from './slices/pizzasSlice'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    pizzas: pizzasReducer,
    cart: cartReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { CartItemType, CartValue } from '../../@types/common'
import { getCartItemsFromLC } from '../../utils/getCartItemsFromLC';
import { calcTotal } from '../../utils/calcTotal';
import { calcSpeciesCount } from '../../utils/calcSpeciesCount';

export interface CartSliceType {
   cart: {id?: CartValue};
   totalCount: number;
   totalPrice: number;
}

const { cart, totalCount, totalPrice } = getCartItemsFromLC()
const initialState: CartSliceType = {
   cart,
   totalCount,
   totalPrice
}

export const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addPizza: (state, action: PayloadAction<CartItemType>) => {
         // @ts-ignore
         const currentItems = state.cart[action.payload.id] ? [...state.cart[action.payload.id].items, action.payload] : [action.payload]
         state.cart = {
            ...state.cart,
            [action.payload.id]: {
               items: currentItems,
               totalCount: currentItems.length,
               totalPrice: calcTotal(currentItems, 'price'),
               allSpecies: calcSpeciesCount(currentItems)
            },
         }
         state.totalCount = calcTotal(Object.values(state.cart), 'totalCount')
         state.totalPrice = calcTotal(Object.values(state.cart), 'totalPrice')
      },
      incrementPizza: (state, action: PayloadAction<string>) => {
         // @ts-ignore
         const currentItems = [...state.cart[action.payload].items, state.cart[action.payload].items[0]]
         state.cart = {
            ...state.cart,
            [action.payload]: {
               items: currentItems,
               totalCount: currentItems.length,
               totalPrice: calcTotal(currentItems, 'price'),
               allSpecies: calcSpeciesCount(currentItems)
            }
         }
         state.totalCount = calcTotal(Object.values(state.cart), 'totalCount')
         state.totalPrice = calcTotal(Object.values(state.cart), 'totalPrice')
      },
      decrementPizza: (state, action: PayloadAction<string>) => {
         // @ts-ignore
         const indexToRemove = state.cart[action.payload].items.indexOf(state.cart[action.payload].items[0])
         // @ts-ignore
         const currentItems = state.cart[action.payload].items
            .filter((_: any, i: number) => i !== indexToRemove)

         state.cart = {
            ...state.cart,
            [action.payload]: {
               items: currentItems,
               totalCount: currentItems.length,
               totalPrice: calcTotal(currentItems, 'price'),
               allSpecies: calcSpeciesCount(currentItems)
            }
         }
         state.totalCount = calcTotal(Object.values(state.cart), 'totalCount')
         state.totalPrice = calcTotal(Object.values(state.cart), 'totalPrice')
      },
      removePizza: (state, action: PayloadAction<string>) => {
         const newCart: any = {...state.cart}
         delete newCart[action.payload]
         state.cart = newCart
         state.totalCount = calcTotal(Object.values(state.cart), 'totalCount')
         state.totalPrice = calcTotal(Object.values(state.cart), 'totalPrice')
      },
      clearOrder: (state) => {
         state.cart = {}
         state.totalCount = 0
         state.totalPrice = 0
      },
   }
})
export const {
   addPizza, 
   incrementPizza, 
   decrementPizza, 
   removePizza,
   clearOrder
} = cartSlice.actions

// Selectors
export const selectCart = (state: RootState) => state.cart

export default cartSlice.reducer
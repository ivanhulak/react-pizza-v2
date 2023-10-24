import { calcTotal } from "./calcTotal"

export const getCartItemsFromLC = () => {
   const data = localStorage.getItem('cart') 
   const cart = data ? JSON.parse(data) : {}
   const totalCount = calcTotal(Object.values(cart), 'totalCount')
   const totalPrice = calcTotal(Object.values(cart), 'totalPrice')
   return { cart, totalCount, totalPrice }
}
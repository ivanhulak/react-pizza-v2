import { CartValue } from "../@types/common"

export const calcTotal = (arr: CartValue[], property: string) => {
   // @ts-ignore
   return arr.reduce((acc, val) => acc + val[property], 0)
}
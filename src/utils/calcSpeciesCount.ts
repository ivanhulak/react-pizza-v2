import { CartItemType } from "../@types/common"

type SingleType = {
   type: string, 
   size: string
}
type WholeSpeciesItem = {
   items: SingleType[];
   count: number;
}
type UniqSpeciesItem = {
   item: SingleType;
   count: number;
}


export const calcSpeciesCount = (pizzas: CartItemType[]) => {
   const typeNames = ['тонкое', 'традиционное']
   const availableSizes = ['26', '30', '40']
   const wholeSpecies: WholeSpeciesItem[] = []
   const uniqSpecies: UniqSpeciesItem[] = []
   typeNames.forEach(type => {
      availableSizes.forEach(size => {
         const elem = pizzas.filter((item: any) => item.type === type && item.size === size)
         wholeSpecies.push({ items: elem, count: elem.length })
      })
   })
   wholeSpecies.filter(elem => elem.count !== 0).forEach(item =>
      uniqSpecies.push({
         item: {
            type: item.items[0].type,
            size: item.items[0].size
         },
         count: item.count
      })
   )
   return uniqSpecies
}
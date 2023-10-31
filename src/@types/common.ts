import { SortTypeEnum } from "./enums";

export type SpeciesItem = {
   item: {
      type: string;
      size: string;
   },
   count: number;
}

export type CartItemType = {
   id: string;
   imageUrl: string;
   name: string;
   size: string;
   type: string;
   price: number;
}

export type SortType = {
   name: string;
   type: 'rating' | 'price' | 'name';
   order: boolean;
}

export type CartValue = {
   items: Array<CartItemType>;
   allSpecies: Array<SpeciesItem>;
   totalCount: number;
   totalPrice: number;
}

export type PizzaType = {
   id: string;
   imageUrl: string;
   name: string;
   type: number[];
   sizes: number[];
   price: number;
   category: number;
   rating: number;
}

export type SearchParamsType = {
   currentPage: number;
   categoryId: number;
   sortBy: SortTypeEnum;
   order: boolean;
}

export type FetchPizzasParamsType = {
   search: string;
   order: 'asc' | 'desc';
   type: SortTypeEnum;
   category: string;
   currentPage: number;
}

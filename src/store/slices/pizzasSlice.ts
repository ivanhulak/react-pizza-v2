import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { FetchPizzasParamsType, PizzaType } from '../../@types/common';
import { StatusEnum } from '../../@types/enums';

const fetchRef = 'https://6527bc64931d71583df149ff.mockapi.io/api/v2/pizzas'

interface PizzasSliceType {
   items: PizzaType[];
   status: 'loading' | 'error' | 'success';
   singlePizza: undefined | PizzaType;
}


const initialState: PizzasSliceType = {
   items: [],
   status : 'loading',
   singlePizza: undefined,
}

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas',
   async (params: FetchPizzasParamsType) => {
      const { search, order, type, category, currentPage } = params
      const { data } = await axios.get<PizzaType[]>(
         `${fetchRef}?page=${currentPage}&limit=4${search}&sortBy=${type}&order=${order}${category}`
      )
      return data as PizzaType[]
   }
)

export const fetchSinglePizza = createAsyncThunk('pizzas/fetchSinglePizza', 
   async (pizzaId: number) => {
      const { data } = await axios.get<PizzaType>(`${fetchRef}/${pizzaId}`)
      return data as PizzaType
   }
)

export const pizzasSlice = createSlice({
   name: 'pizzas',
   initialState,
   reducers: {
      setPizzas: (state, action: PayloadAction<PizzaType[]>) => {
         state.items = action.payload
      },
      setSinglePizza: (state, action: PayloadAction<PizzaType>) => {
         state.singlePizza = action.payload
      }
   },
   extraReducers: builder => {
      builder.addCase(fetchPizzas.pending, (state) => {
         state.status = StatusEnum.LOADING
      })
      builder.addCase(fetchPizzas.fulfilled, (state, action) => {
         state.items = action.payload
         state.status = StatusEnum.SUCCESS
      })
      builder.addCase(fetchPizzas.rejected, (state) => {
         state.items = []
         state.status = StatusEnum.ERROR
      })
      builder.addCase(fetchSinglePizza.fulfilled, (state, action) => {
         state.singlePizza = action.payload
      })
   }
})

export const { setSinglePizza } = pizzasSlice.actions

export default pizzasSlice.reducer
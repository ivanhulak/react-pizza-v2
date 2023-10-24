import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SearchParamsType, SortType } from '../../@types/common'
import { SortTypeEnum } from '../../@types/enums'

interface FilterSliceType {
  currentPage: number,
  categoryId: number,
  sortType: SortType,
  searchValue: string,
}

const initialState: FilterSliceType = {
  currentPage: 1,
  categoryId: 0,
  sortType: {
    name: 'популярности',
    type: SortTypeEnum.RATING,
    order: true
  },
  searchValue: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setFilters: (state, action: PayloadAction<SearchParamsType>) => {
      state.sortType = {
        ...state.sortType,
        type: action.payload.sortBy,
        order: action.payload.order
      }
      state.currentPage = Number(action.payload.currentPage)
      state.categoryId = Number(action.payload.categoryId)
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    }
  }
})

export const { 
  setCategory, 
  setSortType, 
  setCurrentPage, 
  setFilters, 
  setSearchValue 
} = filterSlice.actions

export default filterSlice.reducer
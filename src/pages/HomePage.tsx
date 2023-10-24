import React from 'react'
import qs, { ParsedQs } from 'qs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { setCategory, setCurrentPage, setFilters, setSortType } from '../store/slices/filterSlice'
import { Categories } from '../components/Categories/Categories'
import { Pagination } from '../components/Pagination/Pagination'
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock'
import { fetchPizzas } from '../store/slices/pizzasSlice'
import { CartValue, FetchPizzasParamsType, SearchParamsType, SortType } from '../@types/common'
import { useAppDispatch } from '../store/hooks'
import { SortTypeEnum } from '../@types/enums'

type HomePageProps = {
   cart: {id?: CartValue};
}

const getOrder = (order: string | ParsedQs | string[] | ParsedQs[] | undefined) => {
   if(order === 'asc') return true 
   return false
}

export const HomePage: React.FC<HomePageProps> = ({ cart }) => {
   const [isSearch, setIsSearch] = React.useState(false)
   const [isMounted, setIsMounted] = React.useState(false)
   const { categoryId, sortType, currentPage, searchValue } = useSelector((state: any) => state.filter)
   const {items, status} = useSelector((state: any) => state.pizzas)
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   
   const handleChangeSortType = React.useCallback((obj: SortType) => {
      dispatch(setSortType(obj))
   }, [])
   const handleChangeCategory = React.useCallback((catId: number) => {
      dispatch(setCategory(catId))
   }, [])
   const handlePageChange = (page: number) => dispatch(setCurrentPage(page))

   const getPizzas = async () => {
      const search = searchValue ? `&name=${searchValue}` : ''
      const order = sortType.order ? 'asc' : 'desc'
      const category = categoryId === 0 ? '' : `&category=${categoryId}`
      const objParams: FetchPizzasParamsType = {
         search,
         order, // asc либо desc
         type: sortType.type,
         category,
         currentPage
      }
      dispatch(fetchPizzas(objParams))
   }
   // Если был первый рендер, то 
   React.useEffect(() => {
      if(isMounted){
         const queryString = qs.stringify({
            currentPage,
            categoryId,
            sortBy: sortType.type,
            order: sortType.order ? 'asc' : 'desc'
         })
         navigate(`?${queryString}`)
      }
      setIsMounted(true)
   }, [categoryId, sortType, currentPage])

   // Если был первый рендер, то проверяем url параметры и сохраняем в Redux
   React.useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.substring(1))
         const requestParams: SearchParamsType = {
            ...params,
            currentPage: Number(params.currentPage), 
            categoryId: Number(params.categoryId),
            sortBy: SortTypeEnum.NAME,
            order: getOrder(params.order)
         }
         dispatch(setFilters({ ...requestParams }))
         setIsSearch(true)
      }
   }, [])

   // Если был первый рендер, то запрашиваем пиццы
   React.useEffect(() => {
      if(!isSearch){
         getPizzas()
      }
      setIsSearch(false)
   }, [categoryId, sortType, searchValue, currentPage])

   return (
      <>
         <Categories
            categoryId={categoryId}
            sortType={sortType}
            handleChangeCategory={handleChangeCategory}
            handleChangeSortType={handleChangeSortType}
         />
         <PizzaBlock pizzas={items} status={status} cart={cart}/>
         <Pagination currentPage={currentPage} handlePageChange={handlePageChange} />
      </>
   )
}

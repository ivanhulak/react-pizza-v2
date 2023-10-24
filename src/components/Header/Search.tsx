import React from 'react'
import debounce from 'lodash.debounce';
import { setSearchValue } from '../../store/slices/filterSlice';
import { useAppDispatch } from '../../store/hooks';

export const Search: React.FC = () => {
   const [value, setValue] = React.useState('')
   const searchInputRef = React.useRef<HTMLInputElement>(null)
   const dispatch = useAppDispatch()

   const updateSearchValue = React.useCallback(
      debounce((str: string) => dispatch(setSearchValue(str)), 150), []
   )
   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
      updateSearchValue(value)
   }
   const clearSearchInput = () => {
      dispatch(setSearchValue(''))
      setValue('')
      searchInputRef.current?.focus()
   }

   return (
      <div className='header__search'>
         <svg className='header__search-loupe' aria-labelledby="title desc" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.9 19.7"><g fill="none" stroke="#7B7B7B"><path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" /><circle cx="8" cy="8" r="7" /></g></svg>
         <input
            ref={searchInputRef}
            type="text"
            placeholder='Поиск по пиццам...'
            value={value}
            onChange={handleInputChange}
         />
         {value &&
            <button
               className='header__search-close'
               onClick={clearSearchInput}
            >
               <svg>
                  <line x1="1" y1="18" x2="18" y2="1" stroke="#7B7B7B" strokeWidth="2" />
                  <line x1="1" y1="1" x2="18" y2="18" stroke="#7B7B7B" strokeWidth="2" />
               </svg>
            </button>
         }
      </div>
   )
}

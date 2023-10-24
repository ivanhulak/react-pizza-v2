import React from 'react'
import cn from 'classnames'
import { SortType } from '../../@types/common';

type SortPopUpProps = {
   sortType: SortType;
   handleChangeSortType: (obj: SortType) => void;
}

export const SortPopUp: React.FC<SortPopUpProps> = React.memo(
   ({ sortType, handleChangeSortType }) => {
   const [openPopup, setOpenPopup] = React.useState(false)
   const [order, setOrder] = React.useState(true)
   const sortByRef = React.useRef<HTMLDivElement>(null)

   const handlePopUpClick = () => {
      setOpenPopup(!openPopup)
   }
   
   React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (sortByRef.current && !sortByRef.current.contains(event.target as Node)) {
            setOpenPopup(false)
         }
      }
      document.body.addEventListener('click', handleClickOutside)
      return () => {
         document.body.removeEventListener('click', handleClickOutside)
      }
   }, [])

   const popupItems = [
      { name: 'популярности', type: 'rating', order: order },
      { name: 'цене', type: 'price', order: order },
      { name: 'алфавиту', type: 'name', order: order },
   ]

   return (
      <div
         ref={sortByRef}
         className="categories__sort-by sort-by"
         onClick={handlePopUpClick}
      >
         <svg className={cn('sort-by__triangle-icon', {'rotated': openPopup})} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" fill="#2C2C2C" />
         </svg>
         <div className="sort-by__choice">Сортировка по:
            <span className="sort-by__choice-result">{sortType.name}</span>
         </div>
         <ul className={cn('sort-by__modal', { 'opened': openPopup })}
         >
            {popupItems.map((obj: any) => (
               <li
                  key={obj.type}
                  className={cn('sort-by__item', {
                     'active': obj.type === sortType.type
                  })}
                  onClick={() => handleChangeSortType(obj)}
               >{obj.name}</li>
            ))}
            <li className='sort-by__item'>По возростанию
               <input
                  type="checkbox"
                  checked={order}
                  onChange={() => setOrder(!order)}
               />
            </li>
         </ul>

      </div>
   )
})

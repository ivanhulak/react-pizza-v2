import React from 'react'
import cn from 'classnames'
import { SortPopUp } from './SortPopUp'
import { SortType } from '../../@types/common';

type CategoriesProps = {
   categoryId: number;
   sortType: SortType;
   handleChangeCategory: (catId: number) => void;
   handleChangeSortType: (obj: SortType) => void;
}

const categoryList = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

export const Categories: React.FC<CategoriesProps> = React.memo(({ 
   sortType, 
   categoryId, 
   handleChangeCategory, 
   handleChangeSortType 
}) => {
   return (
      <section className="categories">
         <div className="container__inner">
            <div className="categories__body">
               <ul className="categories__list">
                  {categoryList.map(categoryName => (
                     <li
                        key={categoryName}
                        className={cn('categories__item', {
                           'active': categoryList.indexOf(categoryName) === categoryId
                        })}
                        onClick={() => handleChangeCategory(categoryList.indexOf(categoryName))}
                     >{categoryName}</li>
                  ))}
               </ul>
               <SortPopUp sortType={sortType} handleChangeSortType={handleChangeSortType} />
            </div>
         </div>
      </section>
   )
})

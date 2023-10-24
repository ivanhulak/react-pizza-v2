import React from 'react'
import cn from 'classnames'

type PaginationProps = {
   currentPage: number;
   handlePageChange: (arg: number) => void;
}

const pages = [0, 1, 2, 3]
export const Pagination: React.FC<PaginationProps> = ({ currentPage, handlePageChange }) => {
   return (
      <div className='pagination'>
         <ul className='pagination__list'>
            <button 
               className='pagination__btn'
               onClick={() => handlePageChange(currentPage - 1)}
               disabled={currentPage === 1}
            >Prev</button>
            {pages.map((p, idx) => (
               <li
                  key={idx}
                  className={cn('pagination__item', {'selected': currentPage === p + 1})}
                  onClick={() => handlePageChange(p + 1)}
               >{p + 1}</li>
            ))}
            <button 
               className='pagination__btn'
               onClick={() => handlePageChange(currentPage + 1)}
               disabled={currentPage === 4}
            >Next</button>
         </ul>

      </div>
   )
}



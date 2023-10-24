import React from 'react'
import { NavLink } from 'react-router-dom'

export const SomeErrors: React.FC<{status: string}> = ({ status }) => {
   return (
      <>
         {status === 'error'
            ? <div className='products__nothing'>
               Упс, произошла ошибка при получении пицц.
               <div>
                  <NavLink to='/'>Попробуйте еще раз</NavLink>
               </div>
            </div>
            : <div className='products__nothing'>
               По вашему запросу ничего не найдено
            </div>
         }
      </>
   )
}
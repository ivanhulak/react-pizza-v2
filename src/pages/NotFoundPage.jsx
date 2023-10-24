import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'

export const NotFoundPage = () => {
   return (
      <div className='notFound'>
         <div className="container__inner">
            <div className="notFound__body">
               <h2 className="notFound__text">К сожалению, по вашему запросу ничего не найдено</h2>
               <Link to={'/'}>
                  <Button className="actions-cart__goback-btn goback__btn--outlined">
                     <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                        <path d="M7 13L1 6.93015L6.86175 1" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                     <span>На главную</span>
                  </Button>
               </Link>
            </div>
         </div>
      </div>
   )
}
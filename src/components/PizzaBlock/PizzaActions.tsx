import React from 'react'
import { Button } from '../Button'
import { IconUAH } from '../IconUAH'
import cn from 'classnames'

type PizzaActionsProps = {
   totalCount: number;
   price: number;
   onClickFn: () => void
}

export const PizzaActions: React.FC<PizzaActionsProps> = ({totalCount, price, onClickFn}) => {
   return (
      <div className="pizza-product__actions actions-pizza">
         <div className="actions-pizza__price">от {price}
            <IconUAH color={'000000'} />
         </div>
         <Button
            className="actions-pizza__btn"
            onClickFn={onClickFn}>
            <div className="actions-pizza__btn-text">Добавить
               <div className={cn('actions-pizza__btn-count', {
                  'active': totalCount === undefined
               })}>
                  <span>{totalCount}</span>
               </div>
            </div>
         </Button>
      </div>
   )
}
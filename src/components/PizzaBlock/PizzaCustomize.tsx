import React from 'react'
import cn from 'classnames'
import {pizzaSizes, pizzaTypes} from './PizzaItem'

type PizzaCustomizeProps = {
   pizzaSizeId: number;
   pizzaTypeId: number;
   onChangeType: (typeId: number) => void;
   onChangeSize: (sizeId: number) => void;
}

export const PizzaCustomize: React.FC<PizzaCustomizeProps> = 
({pizzaSizeId, pizzaTypeId, onChangeType, onChangeSize}) => {
   return (
      <div className="pizza-product__customize customize-pizza">
         <ul className="customize-pizza__specious">
            {pizzaTypes.map(type => (
               <li
                  key={type}
                  className={cn('customize-pizza__specious-item', {
                     'active': pizzaTypeId === pizzaTypes.indexOf(type)
                  })}
                  onClick={() => onChangeType(pizzaTypes.indexOf(type))}
               >{type}</li>
            ))}
         </ul>
         <ul className="customize-pizza__size">
            {pizzaSizes.map(size => (
               <li
                  key={size}
                  className={cn('customize-pizza__size-item', {
                     'active': pizzaSizeId === pizzaSizes.indexOf(size)
                  })}
                  onClick={() => onChangeSize(pizzaSizes.indexOf(size))}
               >{size} см.</li>
            ))}
         </ul>
      </div>
   )
}
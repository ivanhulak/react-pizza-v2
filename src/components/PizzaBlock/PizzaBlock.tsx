import React from 'react'
import { CartValue, PizzaType } from '../../@types/common'
import { PizzaItem } from './PizzaItem'
import { PizzaLoading } from './PizzaLoading'
import { SomeErrors } from './SomeErrors'

type PizzaBlockProps = {
   pizzas: PizzaType[];
   status: 'loading' | 'error' | 'success';
   cart: {id?: CartValue};
}

export const PizzaBlock: React.FC<PizzaBlockProps> = ({ pizzas, status, cart }) => {
   return (
      <section className="products">
         <div className="container__inner">
            <div className="products__body">
               <h2 className="products__title">Все пиццы</h2>
               {pizzas.length || status === 'loading'
                  ? <div className="products__row">
                     {status === 'loading'
                        ? Array(4).fill(null).map((_, idx: number) => <PizzaLoading key={idx} />)
                        : pizzas.map(obj => (<PizzaItem key={obj.id} {...obj}
                           // @ts-ignore
                           totalCount={cart[obj.id] && cart[obj.id].totalCount} />
                        ))}
                  </div>
                  : <SomeErrors status={status} />
               }
            </div>
         </div>
      </section>
   )
}
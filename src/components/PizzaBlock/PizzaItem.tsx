import React from 'react'
import { addPizza } from '../../store/slices/cartSlice'
import { Link } from 'react-router-dom'
import { PizzaActions } from './PizzaActions'
import { PizzaCustomize } from './PizzaCustomize'
import { CartItemType } from '../../@types/common'
import { useAppDispatch } from '../../store/hooks'

type PizzaItemProps = {
   id: string;
   imageUrl: string;
   name: string;
   price: number;
   totalCount: number;
}

export const pizzaTypes = ['тонкое', 'традиционное']
export const pizzaSizes = ['26', '30', '40']

export const PizzaItem: React.FC<PizzaItemProps> = ({ id, imageUrl, name, price, totalCount }) => {
   const [pizzaTypeId, setPizzaTypeId] = React.useState(0)
   const [pizzaSizeId, setPizzaSizeId] = React.useState(0)
   const dispatch = useAppDispatch()

   const handleChangePizzaType = (typeId: number) => setPizzaTypeId(typeId)
   const handleChangeSizeId = (sizeId: number) => setPizzaSizeId(sizeId)

   const handleAddPizza = () => {
      const pizzaObj: CartItemType = {
         id,
         imageUrl,
         name,
         type: pizzaTypes[pizzaTypeId],
         size: pizzaSizes[pizzaSizeId],
         price
      }
      // @ts-ignore
      dispatch(addPizza(pizzaObj))
   }

   return (
      <div className="products__product pizza-product">
         <div className="pizza-product__inner">
            <Link to={`/pizza/${id}`}>
               <div className="pizza-product__image">
                  <img src={imageUrl} alt="pizza" />
               </div>
               <div className="pizza-product__name">{name}</div>
            </Link>
            <PizzaCustomize
               pizzaTypeId={pizzaTypeId}
               pizzaSizeId={pizzaSizeId}
               onChangeType={handleChangePizzaType}
               onChangeSize={handleChangeSizeId}
            />
            <PizzaActions
               totalCount={totalCount}
               price={price}
               onClickFn={handleAddPizza}
            />
         </div>
      </div>
   )
}

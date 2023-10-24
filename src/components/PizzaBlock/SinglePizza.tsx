import React from 'react'
import { useParams } from 'react-router-dom'
import { PizzaActions } from './PizzaActions'
import { fetchSinglePizza } from '../../store/slices/pizzasSlice'
import { useSelector } from 'react-redux'
import { PizzaCustomize } from './PizzaCustomize'
import { pizzaTypes, pizzaSizes } from './PizzaItem'
import { addPizza } from '../../store/slices/cartSlice'
import { BackButton } from '../BackButton'
import { useAppDispatch } from '../../store/hooks'

export const SinglePizza:React.FC = () => {
   const [pizzaTypeId, setPizzaTypeId] = React.useState(0)
   const [pizzaSizeId, setPizzaSizeId] = React.useState(0)

   const { singlePizza } = useSelector((state: any) => state.pizzas)
   const { cart } = useSelector((state: any) => state.cart)
   const dispatch = useAppDispatch()
   const { id } = useParams()

   React.useEffect(() => {
      // @ts-ignore
      dispatch(fetchSinglePizza(id))
   }, [])

   const handleChangePizzaType = (typeId: number) => setPizzaTypeId(typeId)
   const handleChangeSizeId = (sizeId: number) => setPizzaSizeId(sizeId)

   const handleAddPizza = () => {
      const pizzaObj = {
         ...singlePizza,
         type: pizzaTypes[pizzaTypeId],
         size: pizzaSizes[pizzaSizeId],
      }
      dispatch(addPizza(pizzaObj))
   }

   if (!singlePizza) {
      return <>'...Загрузка'</>
   }

   return (
      <div className='singlepizza'>
         <div className="container__inner">
            <div className="singlepizza__item item-pizza">
               <div className="item-pizza__image">
                  <img src={singlePizza.imageUrl} alt="" />
               </div>
               <div className="item-pizza__info">
                  <div className="item-pizza__info-inner">
                     <h2 className="item-pizza__name">{singlePizza.name}</h2>
                     <div className="item-pizza__desc">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis ad, reprehenderit, maxime aliquid voluptatem placeat mollitia possimus repudiandae deleniti saepe ipsa animi eveniet magni maiores, exercitationem architecto suscipit accusamus tempora?
                     </div>
                     <PizzaCustomize
                        pizzaTypeId={pizzaTypeId}
                        pizzaSizeId={pizzaSizeId}
                        onChangeType={handleChangePizzaType}
                        onChangeSize={handleChangeSizeId}
                     />
                     <PizzaActions
                        totalCount={cart[singlePizza.id] && cart[singlePizza.id].totalCount}
                        price={singlePizza.price}
                        onClickFn={handleAddPizza}
                     />
                  </div>
               </div>
            </div>
            <div className='singlepizza__goback'><BackButton /></div>
         </div>
      </div>
   )
}

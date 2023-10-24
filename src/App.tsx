import React from 'react';
import { lazily } from 'react-lazily';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { selectCart } from './store/slices/cartSlice';

const { CartPage } = lazily(() => 
  import(/* webpackChunkName: "CartPage" */ './pages/CartPage'));
const { SinglePizza } = lazily(() => 
  import(/* webpackChunkName: "SinglePizza" */ './components/PizzaBlock/SinglePizza'));
const { NotFoundPage } = lazily(() => 
  import(/* webpackChunkName: "NotFoundPage" */ './pages/NotFoundPage'));

export const App:React.FC = () => {
  const { cart, totalCount, totalPrice } = useSelector(selectCart)
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<HomePage cart={cart} />} />
        <Route path='cart' element={
          <React.Suspense fallback={<h1>Идёт загрузка...</h1>}>
            <CartPage totalCount={totalCount} totalPrice={totalPrice} cart={cart} />
          </React.Suspense>
        } />
        <Route path='pizza/:id' element={
          <React.Suspense fallback={<h1>Идёт загрузка...</h1>}>
            <SinglePizza />
          </React.Suspense>
        } />
        <Route path='*' element={
          <React.Suspense fallback={<h1>Идёт загрузка...</h1>}>
            <NotFoundPage />
          </React.Suspense>
        } />
      </Route>
    </Routes>
  );
}

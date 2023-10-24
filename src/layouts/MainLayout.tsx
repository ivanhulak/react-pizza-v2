import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header/Header'

export const MainLayout: React.FC = () => {
   return (
      <div className="wrapper">
         <div className="container">
            <div className="content">
               <Header />
               <Outlet />
            </div>
         </div>
      </div>
   )
}
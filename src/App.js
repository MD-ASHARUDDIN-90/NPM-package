import React from 'react';
import {Routes , Route} from 'react-router-dom'
import HomePage from './Pages/HomePage/HomePage'
import FavPage from './Pages/FavPage/FavPage'


export default function App() {
  

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/fav_list' element={<FavPage />} />
    </Routes>
  
  );
}

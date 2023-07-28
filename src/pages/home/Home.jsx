import React from 'react'
import "./style.scss";
import HeroBanner from './heroBanner/HeroBanner';
import Header from '../../components/header/Header';
import Trending from './Trending';
import Popular from './Popular';
import TopRated from './TopRated';


function Home() {
  return (
    <div className='homepage'>
  
      <HeroBanner/>
      <Trending/>
      <Popular/>
      <TopRated/>
    </div>
  )
}

export default Home

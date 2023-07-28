import { useEffect } from 'react'
import {fetchDataFromApi} from "./utils/api";
import { useSelector, useDispatch } from 'react-redux'
import {getApiConfiguration,getGenres} from './store/homeSlice'

import { BrowserRouter, Routes, Route } from "react-router-dom";
// ALl pages 
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import NotFound from "./pages/404/NotFound";

function App() {
  
  const dispatch = useDispatch();
 

  useEffect(()=>{
    getAllMovieImages();
    genresCall();
  },[]);

  // we are making a api call are storing all the images in our redux store , so that we can append movie id in the imaage url to get image instead of making api call for every image 
  const getAllMovieImages=async()=>{
      const res=await fetchDataFromApi('/configuration');
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
    };

    dispatch(getApiConfiguration(url));

  }

  // For fetching generes for all the movies
    const genresCall = async () => {
      let promises = [];
      let endPoints = ["tv", "movie"];
      let allGenres = {};

      endPoints.forEach((url) => {
          promises.push(fetchDataFromApi(`/genre/${url}/list`));
      });

      // It will return both at the same time , it will wait to fulfuill both fetch method and not return untill both are returned
      const data = await Promise.all(promises);
  
      data.map(({ genres }) => {
          return genres.map((item) => (allGenres[item.id] = item));
      });

      dispatch(getGenres(allGenres));
  };
   
  return (
   <BrowserRouter>
    <Header/>

      <Routes>
          <Route  path="/" element={<Home/>}/>
          <Route  path="/:mediaType/:id" element={<Details />} />
          <Route  path="/search/:query" element={<SearchResult />} />
          <Route  path="/explore/:mediaType" element={<Explore />} />
          <Route  path="*" element={<NotFound/>} />
      </Routes>

   </BrowserRouter>
  )
}

export default App

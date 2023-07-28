import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";

function HeroBanner() {

    // State to track the search input 
    const [query, setQuery] = useState("");
    const [background, setBackground] = useState("");

    // For navigating to search page 
    const navigate = useNavigate();

    // When we press Enter in search input then this method is called 
    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };
    // Method  for returning data for upcoming movies which we will use in background image 
    const { data, loading } = useFetch("/movie/upcoming");

    const {url} = useSelector((state) => state.home);

    useEffect(() => {
        // For setting new background each time we reload 
        const bg =url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);
    }, [data]);

    // Handle search button
  
    const searchQuery=()=>{
       if(query.length>0){
         navigate(`/search/${query}`);
       }else{
        return;
       }
    }

  return (
    <div className="heroBanner">
            {!loading && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, TV shows and people to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or tv show...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button onClick={searchQuery}>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
  )
}

export default HeroBanner

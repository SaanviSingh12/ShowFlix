import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.png";

function Header() {

  // for menu scrolling effect
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  // For search
  const [query, setQuery] = useState("");
  // For showing search icon when clicked on search option in menu bar 
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // In mobile view when search bar is visible then menu icon should not be visible 
  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  // in mobile  view when menu is visible then search icon in nav bar should not be visible
  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  // to handle search bar in nav 
  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  // For navigation in nav bar
  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };


  // For Navbar to show and hide when user scroll
  const controlNavbar = () => {
    if (window.scrollY > 200) {
     
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  // For Navbar to show and hide when user scroll
    useEffect(() => {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        // When we add any listener then it is recommended to remove to otherwise u may face memory leakage problem in console
        window.removeEventListener("scroll", controlNavbar);
      };
    }, [lastScrollY]);

    // When user scrool so much down in page and then go to next page then page should be visible from start rather than scrolled
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
     
          <img src={logo} alt="Logo" /><div className="logoText">ShowFlix</div>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>TV Shows</li>
          <li className="menuItem"><HiOutlineSearch onClick={openSearch} /></li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (<VscChromeClose onClick={() => setMobileMenu(false)} />) : (<SlMenu onClick={openMobileMenu} />)}
        </div>

      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose
                onClick={() => setShowSearch(false)}
              />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  )
}

export default Header

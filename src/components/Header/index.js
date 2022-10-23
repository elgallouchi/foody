import React, { useState } from "react";
import "./index.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { SiJusteat } from "react-icons/si";
import { Link } from "react-router-dom";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);

  // button menu toggle
  const toggleMenu = async () => {
    setOpenMenu(!openMenu);
  };
  return (
    <>
      <header>
        <div className="container">
          <h1>
            <Link to="/food-recipes">
              <SiJusteat /> Food Recipes
            </Link>
          </h1>
          <nav>
            <ul className={`desktop ${!openMenu ? "hidden" : ""}`}>
              <li>
                <Link onClick={() => toggleMenu()} to="/food-recipes">
                  Home
                </Link>
              </li>
              <li>
                <Link onClick={() => toggleMenu()} to="/area-recipes">
                  Area
                </Link>
              </li>
              <li>
                <Link onClick={() => toggleMenu()} to="/favorites">
                  Favorites
                </Link>
              </li>
            </ul>
            {openMenu ? (
              <IoClose onClick={toggleMenu} />
            ) : (
              <GiHamburgerMenu onClick={toggleMenu} />
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

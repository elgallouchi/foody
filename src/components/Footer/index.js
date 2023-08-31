import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTwitterCircle } from "react-icons/ai";

export default function Footer() {
  return (
    <footer>
      <div className="info">
        <div className="container">
          <ul>
            <li>
              <Link to="/foody/favorites">My Favorites</Link>
            </li>
            <li>
              <Link to="/foody/area-recipes">Area Recipes</Link>
            </li>
            <li>
              <a href="#recipes">Ingredients</a>
            </li>
            <li>
              <a href="#recipes">recipe</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <div className="container">
          <span>
            &copy; 2022 - DEVELOPED BY{" "}
            <a href="http://elgallouchi.com" target="_blank">
              ELGALLOUCHI
            </a>
          </span>
          <span>
            <a href="https://facebook.com" target="_blank">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank">
              <RiInstagramFill />
            </a>
            <a href="https://twitter.com" target="_blank">
              <AiFillTwitterCircle />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

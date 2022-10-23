import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function FormSearch() {
  const [text, setText] = useState("");
  const [option, setOption] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (option === "") {
      alert("Please select a option");
    } else {
      navigate({
        pathname: "/results",
        search: `?q=${option}&search=${text}`,
      });
    }
  };
  return (
    <div className="form-search">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h3>Search your recipe !</h3>
          <p>
            <input
              type="search"
              placeholder="Search..."
              onChange={(e) => setText(e.target.value)}
              value={text}
              required
            />
          </p>
          <p>
            <select onChange={(e) => setOption(e.target.value)} required>
              <option>-- select your choice --</option>
              <option value="s">Meal name</option>
              <option value="c">Meal Category</option>
              <option value="i">Meal ingredient</option>
              <option value="a">Meal area</option>
            </select>
          </p>
          <p>
            <button>Search</button>
          </p>
        </form>
      </div>
    </div>
  );
}

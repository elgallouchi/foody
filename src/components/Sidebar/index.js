import React from "react";
import "./index.css";
import FormSearch from "../FormSearch";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="container">
        <FormSearch />
      </div>
    </div>
  );
}

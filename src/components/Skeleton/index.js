import React from "react";
import "./index.css";

export default function skeleton({ width = "100%", height }) {
  return <span className="skeleton-box" style={{ width, height }}></span>;
}

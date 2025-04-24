import React from "react";
import { Link } from "react-router-dom";
import "./styles/Listing.css";

function Listing({ Name, Art, image, id, onNameClick }) {
  return (
    <div className="listing-title">
      <Link to={`/pokemon/${id}`}>
        <img width="100px" src={image} alt={Name} style={{ cursor: "pointer" }} />
      </Link>
      <h3 onClick={onNameClick} style={{ cursor: "pointer", color: "blue" }}>
        {Name}
      </h3>
      <h4>Art: {Art}</h4>
    </div>
  );
}

export default Listing;
import React from "react";
import "./styles/Listing.css";

function Listing({ Name, Art, image, onNameClick }) {
  return (
    <div className="listing-title">
      <img width="100px" src={image} alt={Name} />
      <h3 onClick={onNameClick} style={{ cursor: "pointer", color: "blue" }}>
        {Name}
      </h3>
      <h4>Art: {Art}</h4>
    </div>
  );
}

export default Listing;
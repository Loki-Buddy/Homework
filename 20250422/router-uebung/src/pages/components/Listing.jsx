import React from 'react';
import './styles/Listing.css';

function Listing(props) {
  return (
    <div className="listing-title">
        <img width="100px" src={props.image} alt="bild" />
        <h3>{props.Name}</h3>
        <h4>{props.Art}</h4>
        <h4>{props.Schwaeche}</h4>
    </div>
  )
}

export default Listing
import React, { useState } from "react";
import { Link } from "react-router-dom";

import LocationShowPage from "./LocationShowPage";

const LocationTile = ({ id, name, coordinates, image, description, difficulty }) => {
  const locationUrl = `/locations/${id}`

  return (
    <div className="grid-tile gradient-hover-effect">
      <Link to={locationUrl}>
        <h4 className="location-tile-name">{name}</h4>
        <img className="tile-image-sizing" src={image} />
      </Link>
    </div>
  )
}

export default LocationTile
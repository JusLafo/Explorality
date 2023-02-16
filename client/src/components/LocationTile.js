import React, { useState } from "react";

import LocationShowPage from "./LocationShowPage";

const LocationTile = ({ id, name, coordinates, image, description, difficulty }) => {


  const [shouldLocationShow, toggleShouldLocationShow] = useState(true)

  let showComponent
  if (shouldLocationShow){
    showComponent = <LocationShowPage />
  }

  return (
    <div className="row">
      <div className="column">
        <h4 className="tile-location-name">{name}</h4>
        <img className="tile-image-sizing" src={image} />
      </div>
    </div>
  )
}

export default LocationTile
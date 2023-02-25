import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LocationShowPage = (props) => {
  const [location, setLocation] = useState({})


  const getLocation = async () => {
    const id = props.match.params.id
    try {
      const response = await fetch(`/api/v1/locations/${id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const locationData = await response.json()
      setLocation(locationData.location)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getLocation()
  }, [])

  return (
    <div>
      <li>
        <Link to="/locations" className="top-bar-home-button gradient-hover-effect">Back to locations</Link>
      </li>
      <h1 className="show-page-name">{location.name}</h1> 
      <div className="inline">
        <img className="show-page-image" src={location.image} />
      </div>
      <h5 className="show-page-coordinates">Coordinates: {location.coordinates}</h5>
      <h5 className="show-page-description">About the location: {location.description}</h5>
      <h5 className="show-page-difficulty">Difficulty: {location.difficulty}</h5>
    </div>
  )
}

export default LocationShowPage

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";

import CommentList from "./CommentList.js";

const LocationShowPage = ({ user, match }) => {
  const [location, setLocation] = useState({
    comments: []
  })

  const id = match.params.id

  const getLocation = async () => {
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

  const boston = { lat: 42.361, lng: -71.057 };

  const initMap = () => {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: boston,
      zoom: 11,
    });

    new google.maps.Marker({
      position: new google.maps.LatLng(boston),
      map: map,
    });
  }

  useEffect(() => {
    getLocation()
  }, [])

  useEffect(() => {
    initMap()
  }, [])

  return (
    <div>
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
      <div id="map" className="location-map" style={{height:400}}></div>
    </div>
  )
}

export default LocationShowPage

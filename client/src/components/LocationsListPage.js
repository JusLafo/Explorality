import React, { useEffect, useState } from "react";
import translateServerErrors from "../services/translateServerErrors.js"
import LocationTile from "./LocationTile.js";
import useCollapse from "react-collapsed"

const LocationsListPage = (props) => {
  const [locations, setLocations] = useState([])
  const [newLocation, setNewLocation] = useState({
    name: "",
    latitude: "",
    longitude: "",
    image: "",
    description: "",
    difficulty: ""
  })

  const handleInputChange = (event) => {
    setNewLocation({
      ...newLocation,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const getCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        setNewLocation({
          ...newLocation,
          latitude: lat,
          longitude: lng
        })
      })
    } else {
      console.log("Geolocation is not supported by this browser.")
    }
  }

  const Collapsible = () => {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    return (
      <div className="collapsible">
        <div className="header" {...getToggleProps()}>
          {isExpanded ? 'Collapse' : 'Click here to add a location!'}
        </div>
        <div {...getCollapseProps()}>
          <div className="content">
           <form>
            <label>Location Name:</label>
            <input onChange={handleInputChange} />
            <button type="button" value="button" className="button" onClick={getCoordinates}>Get Coordinates</button>
            <input id="coordinates-field" />
            <label>Dropzone for image placeholder</label>
            <label>Description:</label>
            <input />
            <label>Difficulty:</label>
            <select>
              <option value="0"></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <input type="submit" value="Add Location" className="button" />
           </form>
          </div>
        </div>
      </div>
    );
  }

  const getLocations = async () => {
    try {
      const response = await fetch('/api/v1/locations')
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const parsedResponse = await response.json()
      setLocations(parsedResponse.locations)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getLocations()
  }, [])

  const locationTileComponents = locations.map(locationObject => {
    return (
      <LocationTile
        key={locationObject.id}
        {...locationObject}
      />

    )
  })

  return (
    <div>
      <h1 className="location-list-name">Browse Locations</h1>
      <Collapsible />
      <div className="grid">
        {locationTileComponents}
      </div>
    </div>
  )
}

export default LocationsListPage
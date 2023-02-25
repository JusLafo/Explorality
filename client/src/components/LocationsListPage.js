import React, { useEffect, useState } from "react";
import translateServerErrors from "../services/translateServerErrors.js"
import LocationTile from "./LocationTile.js";
import useCollapse from "react-collapsed"
import { Redirect } from "react-router-dom";

const LocationsListPage = ({ user }) => {
  const [locations, setLocations] = useState([])
  const [newLocation, setNewLocation] = useState({
    name: "",
    latitude: "",
    longitude: "",
    image: "",
    description: "",
    difficulty: ""
  })

  const [shouldRedirect, setShouldRedirect] = useState(false)

  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } = useCollapse();

  const addNewLocation = async () => {
    try {
      const response = await fetch('/api/v1/locations', {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newLocation)
      })
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json()
          const newErrors = translateServerErrors(body.errors)
          return setErrors(newErrors)
        } else {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
      } else {
        const body = await response.json()
        setShouldRedirect(true)
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  
  const getCoordinates = (event) => {
    event.preventDefault()
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
  
  let coordinateDisplay 
  if (newLocation.latitude && newLocation.longitude){
    coordinateDisplay = <>
      <label>Coordinates:</label>
      <input id="coordinates-field-lat" value={newLocation.latitude} onChange={handleInputChange} name="latitude"/>
      <input id="coordinates-field-long" value={newLocation.longitude}  onChange={handleInputChange} name="longitude"/>
    </>
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
    
    if (shouldRedirect) {
      return <Redirect push to="/locations" />
    }
    
    const handleSubmit = event => {
      event.preventDefault()
      addNewLocation()
    }

    const handleInputChange = (event) => {
      setNewLocation({
        ...newLocation,
        [event.currentTarget.name]: event.currentTarget.value
      })
    }
    
    let locationFormComponent = ""
    if (user) {
      locationFormComponent = 
      <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        {isExpanded ? 'Collapse' : 'Click here to add a location!'}
      </div>
      <div {...getCollapseProps()}>
        <div className="content">
        <form>
          <label>Location Name:</label>
          <input type="text" name="name" onChange={handleInputChange} />
          <div className="coordinate-button">
            <p className="button" onClick={getCoordinates}>Get Coordinates</p>
            {coordinateDisplay}
          </div>
          <label>Dropzone for image placeholder</label>
          <label>Description:</label>
          <input type="text" name="description" onChange={handleInputChange}/>
          <label>Difficulty:</label>
          <select name="difficulty" onChange={handleInputChange} className="select-width" value={newLocation.difficulty}>
            <option value="0"></option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <div>
            <input type="submit" value="Add Location" className="button" onClick={handleSubmit} />
          </div>
        </form>
        </div>
      </div>
    </div>
  }

  return (
    <div>
      <h1 className="location-list-name">Browse Locations</h1>
      {locationFormComponent}
      <div className="grid">
        {locationTileComponents}
      </div>
    </div>
  )
}

export default LocationsListPage
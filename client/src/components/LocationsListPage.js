import React, { useEffect, useState } from "react";
import translateServerErrors from "../services/translateServerErrors.js"
import LocationTile from "./LocationTile.js";
import useCollapse from "react-collapsed"
import { Redirect } from "react-router-dom";
import Dropzone from "react-dropzone"

const LocationsListPage = ({ user }) => {
  const [locations, setLocations] = useState([])
  const [newLocation, setNewLocation] = useState({
    name: "",
    latitude: "",
    longitude: "",
    image: {},
    description: "",
    difficulty: ""
  })

  const [uploadedImage, setUploadedImage] = useState({
    preview: ""
  })

  const [shouldRedirect, setShouldRedirect] = useState(false)

  const { getCollapseProps, getToggleProps, isExpanded, setExpanded } = useCollapse();

  const addNewLocation = async () => {
    event.preventDefault()
    const newLocationBody = new FormData()
    newLocationBody.append("name", newLocation.name)
    newLocationBody.append("latitude", newLocation.latitude)
    newLocationBody.append("longitude", newLocation.longitude)
    newLocationBody.append("image", newLocation.image)
    newLocationBody.append("description", newLocation.description)
    newLocationBody.append("difficulty", newLocation.difficulty)

    try {
      const response = await fetch("/api/v1/locations", {
        method: "POST",
        headers: {
          "Accept": "image/jpeg"
        },
        body: newLocationBody
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setLocations([
        ...locations,
        body.location
      ])
      setExpanded(false)
    } catch (error) {
      console.error(`Error in addLocation Fetch: ${error.message}`)
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

    const handleImageUpload = (acceptedImage) => {
      setNewLocation({
        ...newLocation,
        image: acceptedImage[0]
      })

      setUploadedImage({
        preview: URL.createObjectURL(acceptedImage[0])
      })
    }
  
    let previewComponent = ''
    if (uploadedImage.preview) {
      previewComponent = <img src={uploadedImage.preview} />
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
            <p className="button coordinate-button gradient-hover-effect" onClick={getCoordinates}>Get Coordinates</p>
            {coordinateDisplay}
          </div>
          <label>Location Image:</label>
          <div className="list-page-dropzone">
            <Dropzone onDrop={handleImageUpload}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag your image or click here to upload!</p>
                  </div>
                </section>
              )}
            </Dropzone>
            {previewComponent}
          </div>
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
            <input type="submit" value="Add Location" className="button gradient-hover-effect location-submit-button" onClick={handleSubmit} />
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
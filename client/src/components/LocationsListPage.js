import React, { useEffect, useState } from "react";
import translateServerErrors from "../services/translateServerErrors.js"
import LocationTile from "./LocationTile.js";

const LocationsListPage = (props) => {
  const [locations, setLocations] = useState([])


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
      <h1 className="locations-list-title center">Browse Locations</h1>
      {locationTileComponents}
    </div>
  )
}

export default LocationsListPage
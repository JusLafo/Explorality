import React, { useEffect, useState } from "react";

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
      <h1>{location.name}</h1>
      <h5>{location.description}</h5>
    </div>
  )
}

export default LocationShowPage

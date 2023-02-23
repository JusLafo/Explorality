import React, { useState } from "react";
import Dropzone from "react-dropzone"

const UserShowPage = (props) => {
  const { id } = props.match.params
  const currentUser = props.currentUser
  const [user, setUser] = useState({
    profileImage: ''
  })

  const [newProfileImage, setNewProfileImage] = useState({
    image: {}
  })

  const [uploadedImage, setUploadedImage] = useState({
    preview: ""
  })

  const handleImageUpload = (acceptedImage) => {
    setNewProfileImage({
      ...newProfileImage,
      image: acceptedImage[0]
    })

    setUploadedImage({
      preview: URL.createObjectURL(acceptedImage[0])
    })
  }
  
  const addProfileImage = async (event) => {
    event.preventDefault()
    const imageAddToProfile = new FormData()
    imageAddToProfile.append("image", newProfileImage.image)
    try {
      const response = await fetch(`/api/v1/users/${user.id}`, {
        method: "PATCH",
        headers: {
        "Accept": "image/jpeg"
        },
        body: imageAddToProfile
      })
      if (!response.ok) {
        throw new Error(`${response.status} (${response.statusText})`)
      }
      const body = await response.json()
      setUser(body.user)
      setUploadedImage({
        preview: ""
      })
    } catch (error) {
      console.error(`Error in add profile image: ${error.message}`)
    }
  }

  const getUser = async () => {
    try {
      const response = await fetch(`/api/v1/users/${id}`)
      if(!response.ok) {
        const errorMessage = `${response.status}: (${response.statusText})`
        throw new Error(errorMessage)
      }
      const body = await response.json()
      setUser(body.user)
    } catch (error) {
      console.error(`error in fetch: ${error}`)
    }
  }

  useState(() => {
    getUser()
  }, [])

  let adminText = ''
  if(currentUser?.isAdmin) {
    adminText = "You are logged in as administrator"
  }
  
  let profileImageText = ''
  if(currentUser?.profileImage === "https://explorality.s3.amazonaws.com/blank-profile.jpg") {
    profileImageText = "Add a profile picture!"
  }

  let previewComponent = ''
  if (uploadedImage.preview) {
    previewComponent = <img src={uploadedImage.preview} />
  }

  const DateObject = new Date(user.createdAt)
  const createdDateString= DateObject.toUTCString()

  let dropzoneComponent = ''
  if(currentUser?.id === user.id) {
    dropzoneComponent = (
      <div className="dropzone">
        <form onSubmit={addProfileImage}>
          <Dropzone onDrop={handleImageUpload}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input type="text" {...getInputProps()} />
                  <p className = "centered">Drag a file or click here to upload a profile picture</p>
                </div>
              </section>
            )}
          </Dropzone>
          <input className='button gradient-hover-effect' type='submit' value='save profile' />
        </form>
        {previewComponent}
      </div>
    )
  }

  return (
    <div>
      <h1 className="profile-username">Welcome {currentUser?.username}</h1>
      <h4 className="profile-created-at">You've been a user since {createdDateString}</h4>
      <h5 className="profile-admin">{adminText}</h5>
      <div className="profile-image-div">
        <img src={user.profileImage} className="profile-image" />
        <p className="profile-image-text">{profileImageText}</p>
      </div>
      {dropzoneComponent}
    </div>
  )
}

export default UserShowPage
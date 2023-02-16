import { Location } from "../../models/index.js"

const locationData = [
  {
    name: "Mount Pisgah, Westmore",
    coordinates: "44.730471843914586, -72.03101695262744",
    image: "https://explorality.s3.amazonaws.com/Mount-Pisgah.jpg",
    description: "Mount Pisgah is a beautiful mountain that overlooks the glacier lake Lake Willoughby.",
    difficulty: 2
  },
  {
    name: "Stowe Pinnacle, Stowe",
    coordinates: "44.43136472511304, -72.64906974736668",
    image: "https://explorality.s3.amazonaws.com/Stowe-Pinnacle.jpg",
    description: "One of Vermont's most photographed viewpoints that captures views of Camels Hump, Mount Mansfield, and the Sterling Range.",
    difficulty: 3
  },
  {
    name: "Sunset Ridge and Long Trail Loop",
    coordinates: "44.53473639601155, -72.83081444476825",
    image: "https://explorality.s3.amazonaws.com/Sunset-Ridge.jpeg",
    description: "Generally considered a challenging route, this is a very popular area for camping, hiking, and cross-country skiing.",
    difficulty: 5
  },
  {
    name: "Mount Philo",
    coordinates: "44.27856976841202, -73.21623513623071",
    image: "https://explorality.s3.amazonaws.com/Mount-Philo.jpg",
    description: "The hike up Mount Philo delivers views of the valley as well as Lake Champlain.",
    difficulty: 1
  },
  {
    name: "Bingham Falls",
    coordinates: "44.51992420215608, -72.76698020540633",
    image: "https://explorality.s3.amazonaws.com/Bingham-Falls.jpeg",
    description: "A quick and easy hike near Stowe, with beautiful views of cascading waterfalls.",
    difficulty: 1
  }
]

class LocationSeeder {
  static async seed() {
    for (const singleLocationData of locationData) {
      const currentLocation = await Location.query().findOne(singleLocationData)
      if (!currentLocation) {
        await Location.query().insert(singleLocationData)
      }
    }
    return await Location.query()
  }
}

export default LocationSeeder
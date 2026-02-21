import axios from "axios";
import { captainModel } from "../models/captain.model.js";

const fetchgetCoordinates = async (address) => {
  try {
    const response = await axios.get(
      "https://api.openrouteservice.org/geocode/search",
      {
        params: { text: address, size: 1 },
        headers: { Authorization: process.env.OPEN_ROUTE_API },
      }
    );

    const data = response.data.features;

    if (!data || data.length === 0) {
      throw new Error("Address not found");
    }

    return {
      lat: data[0].geometry.coordinates[1], // ORS returns [lng, lat]
      lng: data[0].geometry.coordinates[0],
    };
  } catch (err) {
    console.error("Geocoding error:", err.response?.data || err.message);
    throw new Error("Unable to fetch coordinates");
  }
};

const fetchDistanceTime = async (origin, destination) => {

  if (!origin || !destination) {
    throw new Error("Origin and destination are required"); 
  }

  try {
    const response = await axios.get(
      "https://api.openrouteservice.org/v2/directions/driving-car",
      {
        params: {
          start: `${origin.lng},${origin.lat}`, // note lng,lat order
          end: `${destination.lng},${destination.lat}`,
        },
        headers: {
          Authorization: process.env.OPEN_ROUTE_API,
        },
      }
    );

    const route = response.data.features[0].properties.summary;

    return {
      distance: route.distance, // in meters
      duration: route.duration, // in seconds
    };

  } catch (error) {
    console.error(error);
    throw new Error("Unable to fetch route info");
  }
};

const getSuggestions = async (input) => {
  try {
    const response = await axios.get("https://api.openrouteservice.org/geocode/search", {
      params: {
        text: input,
        size: 4, // return top 4 suggestions
      },
      headers: {
        Authorization: process.env.OPEN_ROUTE_API,
      },
    });

    // Extract name + coordinates
    return response.data.features.map(f => ({
      name: f.properties.label,
      lat: f.geometry.coordinates[1],
      lng: f.geometry.coordinates[0],
    }));
  } catch (err) {
    console.error(err.response?.data || err.message);
    throw new Error("Unable to fetch suggestions");
  }
};

const getCaptainInTheRadius = async (lat , lng , radius) => {
  const captains = await captainModel.find({
    location : {
      $geoWithin : {
        $centerSphere : [[lat , lng] , radius / 6371] // radius in km
      }
    }
  })

  return captains;
}

export {
  fetchgetCoordinates,
  fetchDistanceTime,
  getSuggestions,
  getCaptainInTheRadius,
}

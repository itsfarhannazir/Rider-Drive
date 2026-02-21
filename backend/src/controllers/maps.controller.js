import { fetchgetCoordinates, fetchDistanceTime, getSuggestions } from "../services/maps.service.js";
import { validationResult } from "express-validator";

const getCoordinates = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {

    const coordinates = await fetchgetCoordinates(address);

    return res.status(200).json(coordinates);

  } catch (error) {
    return res.status(404).json({
      message: "Coordinates not found for the given address",
    })
  }
}

const getDistanceTime = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { origin, destination } = req.query

    const coordinates1 = await fetchgetCoordinates(origin);
    const coordinates2 = await fetchgetCoordinates(destination);

    const route = await fetchDistanceTime(coordinates1, coordinates2);

    return res.status(200).json(route);
  } catch (err) {
    return res.status(404).json({
      message: "Coordinates not found or unable to fetch route",
    })
  }

}

const getSuggestionsController = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { input } = req.query;

    const suggestions = await getSuggestions(input);

    return res.status(200).json(suggestions);
  } catch (error) {
    return res.status(404).json({
      message: "Unable to find suggestions",
    })
  }

}

export {
  getCoordinates,
  getDistanceTime,
  getSuggestionsController
}
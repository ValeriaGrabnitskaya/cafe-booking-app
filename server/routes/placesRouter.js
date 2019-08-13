const express = require("express");
const placesRouter = express.Router();
const placesController = require('../controllers/placesController');
 
placesRouter.post("/get-places-for-dictionary", placesController.getPlacesForDropdown);
placesRouter.post("/search", placesController.searchPlaces);
placesRouter.post("/get-by-id", placesController.getPlaceById);
placesRouter.post("/get-available-tables", placesController.getAvailableTables);
placesRouter.post("/book-table", placesController.addBookTableInfo);
placesRouter.post("/add-comment", placesController.addComment);
 
module.exports = placesRouter;
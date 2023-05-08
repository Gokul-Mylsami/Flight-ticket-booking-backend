const express = require("express");
const router = express.Router();

const flightController = require("../controller/flightController");

router.get("/", flightController.getAllFlights);
router.get("/airports", flightController.getAirports);
router.post("/", flightController.createFlight);

router.get("/:id", flightController.getFlight);
router.patch("/:id", flightController.updateFlight);
router.delete("/:id", flightController.deleteFlight);

module.exports = router;

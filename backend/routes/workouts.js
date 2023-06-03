const express = require("express");
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//this will ensure all the workout routes are authenticated
router.use(requireAuth)

// GET all workouts
router.get("/", getWorkouts);

//GET single workouts
router.get("/:id", getWorkout);

//POST a new request
router.post("/", createWorkout);

//DELETE a workout
router.delete("/:id", deleteWorkout);

//UPDATE a workout
router.patch("/:id", updateWorkout);

module.exports = router;

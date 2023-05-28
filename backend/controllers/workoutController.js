const Workout = require("../models/workoutModel"); //use Workout model to create, modify, delete documents in DB
const mongoose = require("mongoose");

// GET all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 }); //Get all the documents (empty object in find) and sort it with updated one on top
  res.status(200).json(workouts);
};

// GET a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params; //only extract the id from the parameters

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No workout found" });
  }

  const workout = await Workout.findById(id); //Get the document with id

  if (!workout) {
    return res.status(404).json({ error: "No workout found" });
  }
  res.status(200).json(workout);
};

//CREATE new workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  // add doc to DB
  try {
    const workout = await Workout.create({ title, reps, load }); //workout will represent the document created in DB
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//DELETE a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Cannot found workout to delete" });
  }
  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: "No workout found" });
  }
  res.status(200).json(workout);
};

//UPDATE a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Cannot delete the workout" });
  }
  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!workout) {
    res.status(404).json({ error: "Cannot Update" });
  }
  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
};

const express = require("express")
const router = express.Router()

// we need to use the workouts model
const Workout = require("../models/mySchemaModels")

// GET all jobs
router.get("/", (req, res) => {
    res.json({mssg: 'GET all jobs'});
})

// GET a single job
router.get("/:id", (req, res) => {
    res.json({mssg: 'GET a single job'});
})

router.post('/', (req, res) => {
    // req.body .... accessible after the express.json() is used.
    // const {title, load, reps} = req.body;
    // try {
    //     const workout = await Workout.create({
    //         title, load, reps
    //     });
    // }catch(error) {

    // }

    res.json({mssg: 'POST a new workout'})
});

router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a workout'})
});

router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a workout'})
});

module.exports = router
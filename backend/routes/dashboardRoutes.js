const express = require("express")
const router = express.Router()

// we need to use the model
const userModel = require("../models/userModel")
const {
    getDetails,
} = require("../controllers/dashboardController")

// GET all jobs
router.get("/", (req, res) => {
    res.json({mssg: 'GET all jobs'});
})

// GET a single job
router.get("/:id", getDetails)

router.post('/', (req, res) => {
    // req.body .... accessible after the express.json() is used.
    // const {title, load, reps} = req.body;

    res.json({mssg: 'POST a new workout'})
});

router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a workout'})
});

router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a workout'})
});

module.exports = router
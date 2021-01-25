const router = require('express').Router();
const Project = require('../models/projectModel');
const auth = require('../middleware/auth');

router.post("/", async (req, res) => {
    try {
        const { name, userID } = req.body 

        const newProject = new Project({
            name,
            userID
        });

        const savedProject = await newProject.save();
        res.json(savedProject)

    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

router.get("/", auth, async (req, res) => {
    try {
        const project = await Project.find({userID: req.user});
        res.json(project)
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

router.get("/:id", async (req, res) => {
    try {
        // console.log(req.params.id)
        const oneProject = await Project.findById(req.params.id);
        res.json(oneProject);
        // console.log(oneProject) 
    } catch(err) {
        res.status(500).json({error: err.message})
    }
});

module.exports = router
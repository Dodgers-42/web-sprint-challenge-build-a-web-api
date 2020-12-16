const express = reqire("express")
const router = express.Router();

const projectDb = require("../helpers/projectModel");
const db = require("../helpers/actionModel");
const { route } = require("../middleware/projectRoute");

// const {validateActionId, validateActionCreation, validationProjectIDForAction} = require("./validations")


router.get('/', (req, res) =>{
    db.get()
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(err => {
            res.staus(500).json({message: "An error has occured"});
        })
})

router.post('/',async (req, res) => {
    const {project_id, description, notes} = req.body;
    if(!project_id || !description || !notes) 
    return res.status(400).json({message: "project id, and notes required"});
    try {
        const project = await projectDb.get(project_id);
        if(!project) res.srtatus(400).json({message: "project doesn't exist"});
    }catch(err){
        res.status(500).json({message: "An error has occured"});
    }
    db.insert(req.body)
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(err =>{
        res.status(500).json({message: "An error has occured"});
})
});

router.get('/:id', (req, res) =>{
    dB.get(req.params.id)
    .then(action =>{
        if(action == 0)
         return res.status(404).json({message: "Action does not exist"})
        res.status(200).json(action);
    })
    .catch(err => {
        res.status(500).json({message: "An error has occured"});
    })
});


router.put('/:id', (req, res) =>{
    const changes = req.body;
    dB.update(req.params.id, changes)
    .then(updatedAction =>{
        if(!updateedAction) return res.status(404).json({message: "Action does not exist"})
        res.status(200).json(updatedAction);
    })
    .catch(err => {
        res.status(500).json({message: "An error has occured"});
    });
});

router.delete('/:id', (req, res) =>{
    dB.remove(req.params.id)
    .then(deleteAction =>{
        if(deleteAction == 0) return res.status(404).json({message: "Action does not exist"})
        res.status(200).json({message: `Action with id ${req.params.id} deleted`});
    })
    .catch(err => {
        res.status(500).json({message: "An error has occured"});
    })
})



module.exports = router;
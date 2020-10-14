const express = reqire("express")

const actionModel = require("../helpers/actionModel")

const {validateActionId, validateActionCreation, validationProjectIDForAction} = require("./validations")

const router = express.Router();

router.get('/actions', (req, res, next) =>{
    actionModel.get()
        .then(action =>{
            res.status(200).json(action)
        })
        .catch(next)
})

router.get('/actions:id', validateActionId, (req, res, next) =>{
            res.status(200).json(action)
})

router.post('/actions', validationProjectIDForAction, validateActionCreation, (req, res, next) =>{
    actionModel.insert(req.body)
    .then(action =>{
        res.status(201).json(action)
    })
    .catch(next)
})

router.put('/actions/:id', validateActionId, validationProjectIDForAction, validateActionCreation, (req, res,next) =>{
    actionModel.update(req.params.id, req.body)
    .then(action =>{
        res.status(201).json(action)
    })
    .catch(next)
})

router.delete('/actions/:id', validateActionId, (req, res, next) =>{
    actionModel.remove(req.params.id)
    .then(action =>{
        res.status(201).json(action)
    })
    .catch(next)
})



module.exports = router;
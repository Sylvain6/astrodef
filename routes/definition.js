const express = require("express");
const Definition = require("../models/definition");
const Subject = require("../models/subject");

const router = express.Router();

const exist = async (doc) => await Subject.findOne({ name: doc }).exec()

router.get("/", (req, res) => {
    Definition.find(req.query).then(data => res.json(data));
});

// definitions/subject/:id
router.get("/subject/:subject", (req, res) => {
    Definition.find({ subject: req.params.subject })
        .then(data => res.json(data))
        .catch(error => {
            console.log(error);
            if (error.name === "CastError") {
                res.status(422).json({ message: "Invalid id" });
            } else {
                res.sendStatus(500);
            }
        });
});

// definitions/:id
router.get("/:id", (req, res) => {
    Definition.findOne({ _id: req.params.id })
        .then(data => res.json(data))
        .catch(error => {
            console.log(error);
            if (error.name === "CastError") {
                res.status(422).json({ message: "Invalid id" });
            } else {
                res.sendStatus(500);
            }
        });
});

// definitions/:id
router.put("/:id", (req, res) => {
    const definition = new Definition({ _id: req.params.id });
    definition.populate(res.body);
    definition.save();
});

// /definitions
router.post("/", async (req, res) => {
    const definition = new Definition(req.body);
    if (await exist(req.body.subject)) {
        definition
            .save()
            .then(data => res.status(201).send(data))
            .catch(error => {
                if (error.name === "ValidationError") {
                    res.status(400).json(error.errors);
                } else {
                    res.sendStatus(500);
                }
            });
    } else {
        res.status(400).json("You must use a valid subject");
    }
});

// /definitions/:id
router.delete("/:id", (req, res) => {
    Definition.findOneAndDelete({ _id: req.params.id })
        .then(data => res.json(data))
        .catch(error => {
            console.log(error);
            if (error.name === "CastError") {
                res.status(422).json({ message: "Invalid id" });
            } else {
                res.sendStatus(500);
            }
        });
});

module.exports = router;
const express = require("express");
const Subject = require("../models/subject");

const router = express.Router();

router.get("/", (req, res) => {
    Subject.find(req.query).then(data => res.json(data));
});

// subjects/:id
router.get("/:id", (req, res) => {
    Subject.findOne({ _id: req.params.id })
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

// subjects/:id
router.put("/:id", (req, res) => {
    const subject = new Subject({ _id: req.params.id });
    subject.populate(res.body);
    subject.save();
});

// /subjects
router.post("/", (req, res) => {
    const subject = new Subject(req.body);

    subject
        .save()
        .then(data => res.status(201).send(data))
        .catch(error => {
            if (error.name === "ValidationError") {
                res.status(400).json(error.errors);
            } else {
                res.sendStatus(500);
            }
        });
});

// /subjects/:id
router.delete("/:id", (req, res) => {
    Subject.findOneAndDelete({ _id: req.params.id })
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
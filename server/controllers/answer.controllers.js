const Answer = require('../models/answer.models');

module.exports.findAnswer = (req, res) => {
    Answer.find()
        .then(allFighters => res.json({ answer: allFighters }))
        .catch(err => res.status(400).json(err));
}

module.exports.createNewAnswer = (req, res) => {
    Answer.create(req.body)
        .then(newFighter => res.json({ answer: newFighter }))
        .catch(err => res.status(400).json(err));
}
 
module.exports.deleteAnswer = (req, res) => {
    Answer.deleteOne()
        .then(result => res.json({ result: result }))
        .catch(err => res.status(400).json(err));
}

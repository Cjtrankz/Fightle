const Fighter = require('../models/fighters.models');


module.exports.findAllFighters = (req, res) => {
    Fighter.find()
        .then(allFighters => res.json({ fighters: allFighters }))
        .catch(err => res.status(400).json(err));
}

// module.exports.findAnswer = (req, res) => {
//     Fighter.find()
//         .then(allFighters => res.json({ answer: allFighters }))
//         .catch(err => res.status(400).json(err));
// }
 
module.exports.findOneSingleFighter = (req, res) => {
    Fighter.findOne({ _id: req.params.id })
        .then(oneSingleFighter => res.json({ fighter: oneSingleFighter }))
        .catch(err => res.status(400).json(err));
}
 
module.exports.createNewFighter = (req, res) => {
    Fighter.create(req.body)
        .then(newFighter => res.json({ fighter: newFighter }))
        .catch(err => res.status(400).json(err));
}

// module.exports.createNewAnswer = (req, res) => {
//     Fighter.create(req.body)
//         .then(newFighter => res.json({ answer: newFighter }))
//         .catch(err => res.status(400).json(err));
// }
 
module.exports.deleteAnExistingFighter = (req, res) => {
    Fighter.deleteOne({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.status(400).json(err));
}

module.exports.findRandomFighter = (req, res) => {
    Fighter.aggregate([{ $sample: { size: 1 } }])
    .then(result => res.json({ fighter:result }))
    .catch(err => res.status(400).json(err));
}
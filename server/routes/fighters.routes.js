const FighterController = require('../controllers/fighters.controllers');

module.exports = app => {
    app.get('/api/fighters', FighterController.findAllFighters);
    app.get('/api/fighters/random', FighterController.findRandomFighter);
    app.get('/api/fighters/:id', FighterController.findOneSingleFighter);
    app.post('/api/fighters/new', FighterController.createNewFighter);
    app.delete('/api/fighters/delete/:id', FighterController.deleteAnExistingFighter);
}

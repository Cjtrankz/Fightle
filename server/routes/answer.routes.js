const AnswerController = require('../controllers/answer.controllers');

module.exports = app => {
    app.get('/api/answer', AnswerController.findAnswer);
    app.post('/api/answer', AnswerController.createNewAnswer);
    app.delete('/api/answer/delete/', AnswerController.deleteAnswer);
}

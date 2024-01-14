const express = require('express');

const controller = require('../controllers/controller');

const inboxRouter = express.Router();


inboxRouter.post('/addMessageInbox', controller.addMessageInbox);
inboxRouter.get('/readAllMessage', controller.readAllMessage);
inboxRouter.delete('/deleteMessage/:id', controller.deleteMessage);

module.exports = inboxRouter;
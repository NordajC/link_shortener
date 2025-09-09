const express = require('express');
const router = express.Router();
const { createShortUrl, getLongUrl } = require('../controllers/urlController.js');
const { authMiddleware } = require('../middleware/authMiddleware.js')

// TODO: The 'Create Short URL' endpoint will go here
router.post('/createShortUrl', [ authMiddleware ] , createShortUrl);

//get long url form DB
router.get('/:shortCode', getLongUrl );


module.exports = router;
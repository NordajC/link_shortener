const express = require('express');
const router = express.Router();
const { createShortUrl, getLongUrl, deleteUrl, getUserUrls, getAnalytics, createPublicShortUrl } = require('../controllers/urlController.js');
const { authMiddleware } = require('../middleware/authMiddleware.js')

// Get all URLs for a user
router.get('/', authMiddleware, getUserUrls);

//create demo public url
router.post('/public', createPublicShortUrl);

// create shortURL
router.post('/createShortUrl', [ authMiddleware ] , createShortUrl);

//get analytics
router.get('/analytics', authMiddleware, getAnalytics);

//get long url form DB
// router.get('/:shortCode', getLongUrl );

//delete url
router.delete('/:id', authMiddleware, deleteUrl);

module.exports = router;
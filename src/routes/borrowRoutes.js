const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/:bookId', verifyToken, borrowController.borrowBook);
router.get('/my-history', verifyToken, borrowController.getMyHistory);

module.exports = router;

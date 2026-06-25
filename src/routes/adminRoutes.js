const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.use(verifyToken, isAdmin);

router.get('/stats', adminController.getStats);
router.get('/comments', adminController.getAllComments);
router.delete('/comments/:id', adminController.deleteComment);

router.get('/borrows', adminController.getAllBorrowRecords);
router.put('/borrows/:id', adminController.updateBorrowStatus);

router.post('/books', adminController.addBook);
router.put('/books/:id', adminController.updateBook);
router.delete('/books/:id', adminController.deleteBook);

router.get('/users', adminController.getAllUsers);
router.put('/users/:id/role', adminController.updateUserRole);

module.exports = router;

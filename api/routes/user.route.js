import express from 'express';
import { deleteUser, test, updateUser } from '../controllers/user.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/test/user', test)
router.post('/update/:id', protect, updateUser)
router.delete('/delete/:id', protect, deleteUser)
export default router;
import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/test', test)
router.post('/update/:id', protect, updateUser)
export default router;
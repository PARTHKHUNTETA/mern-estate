import express from 'express';
import { google, signIn, signOut, signUp, test } from '../controllers/auth.controller.js';
const router = express.Router();

router.get('/test/auth', test)
router.post('/signup', signUp)
router.post('/signin', signIn)
router.post('/google', google)
router.post('/signout', signOut)

export default router;
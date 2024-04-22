import express from 'express'
import { createListing, deleteListing, getListing, getListings, test, updateListing } from '../controllers/listing.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/test/listing', test)
router.post('/create',createListing);
router.delete('/delete/:id', protect, deleteListing);
router.post('/update/:id', protect, updateListing);
router.get('/get/:id', getListing);
router.get('/get', getListings);

export default router;
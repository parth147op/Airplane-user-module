import express from 'express';
import { signUp, bookFlight, cancelFlight, viewProfile } from '../controllers/userController';
import { authMiddleware } from '../middlewares/auth';

const router = express.Router();

// User-related routes
router.post('/signup', signUp);
router.post('/book', authMiddleware, bookFlight); // Add authentication
router.post('/cancel', authMiddleware, cancelFlight);
router.get('/profile/:userId', authMiddleware, viewProfile);

export default router;

import express from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js';
// import { requireAuth} from '../Middleware/authMiddleware.js'
import { 
    CreateEvent, 
    GetEvents, 
    GetEventById, 
    UpdateEvent, 
    DeleteEvent,
    SoftDeleteEvent, 

} from '../Controllers/EventController.js';

const router = express.Router();

// Protected routes for event management
router.post('/create', verifyToken, CreateEvent);
router.get('/', verifyToken, GetEvents);
router.get('/all',GetEvents);
router.get('/:eventId', verifyToken, GetEventById);
router.put('/:eventId', verifyToken, UpdateEvent);
router.delete('/:eventId', verifyToken, DeleteEvent);
router.delete('/soft/:eventId',verifyToken, SoftDeleteEvent);


export default router;

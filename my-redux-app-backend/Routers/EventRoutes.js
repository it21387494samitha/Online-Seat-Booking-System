import express from 'express';
import { verifyToken } from '../Middleware/VerifyToken.js';
import { 
    CreateEvent, 
    GetEvents, 
    GetEventById, 
    UpdateEvent, 
    DeleteEvent, 

} from '../Controllers/EventController.js';

const router = express.Router();

// Protected routes for event management
router.post('/create', verifyToken, CreateEvent);
router.get('/', verifyToken, GetEvents);
router.get('/all',GetEvents);
router.get('/:eventId', verifyToken, GetEventById);
router.put('/:eventId', verifyToken, UpdateEvent);
router.delete('/:eventId', verifyToken, DeleteEvent);


export default router;

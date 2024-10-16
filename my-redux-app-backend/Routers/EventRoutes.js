import express from 'express';
import { isAdmin, verifyToken } from '../Middleware/VerifyToken.js';
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
router.post('/create', isAdmin, CreateEvent);
router.get('/',  GetEvents);
router.get('/all',GetEvents);
router.get('/:eventId',  GetEventById);
router.put('/:eventId',  UpdateEvent);
router.delete('/:eventId',  DeleteEvent);
router.delete('/soft/:eventId', SoftDeleteEvent);



export default router;

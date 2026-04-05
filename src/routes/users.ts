import { Router } from 'express';
import { createUserHandler, getUsersHandler, updateUserHandler } from '../controllers/users';
import { requireAdmin } from '../middleware/auth';

const router = Router();

router.post('/', requireAdmin, createUserHandler);
router.get('/', requireAdmin, getUsersHandler);
router.patch('/:id', requireAdmin, updateUserHandler);

export default router;

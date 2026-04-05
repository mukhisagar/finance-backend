import { Router } from 'express';
import { getSummaryHandler, getTrendsHandler } from '../controllers/dashboard';

const router = Router();

router.get('/summary', getSummaryHandler);
router.get('/trends', getTrendsHandler);

export default router;

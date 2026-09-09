import { Router } from 'express';
import { dashboard, overview } from '../controllers/analyticsController.js';
const router = Router();
router.get('/dashboard', dashboard);
router.get('/overview', overview);
export default router;

import { Router } from 'express';
import { listOfferings } from '../controllers/offeringController.js';
const router = Router();
router.get('/', listOfferings);
export default router;

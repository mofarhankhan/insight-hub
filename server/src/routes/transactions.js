import { Router } from 'express';
import { listTransactions } from '../controllers/transactionController.js';
const router = Router();
router.get('/', listTransactions);
export default router;

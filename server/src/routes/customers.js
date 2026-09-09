import { Router } from 'express';
import { listCustomers, getCustomer } from '../controllers/customerController.js';
const router = Router();
router.get('/', listCustomers);
router.get('/:id', getCustomer);
export default router;

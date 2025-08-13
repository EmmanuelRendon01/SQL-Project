import { Router } from "express";
import * as customersController from '../controllers/customersController.js';

const router = Router();

router.get('/:email', customersController.getCustomerByEmail);


export default router;
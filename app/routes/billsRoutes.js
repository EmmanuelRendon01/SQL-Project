import { Router } from "express";
import * as billsController from '../controllers/billsController.js';

// Here you can find all the endpoints routes to use.

// Each router activate a billsController function.

const router = Router();

router.get('/', billsController.getAllBills);
router.get('/:id', billsController.getBillById);

router.get('/ad/1', billsController.getAdvancedQueries1);
router.get('/ad/2', billsController.getAdvancedQueries2);
router.get('/ad/3', billsController.getAdvancedQueries3);
router.get('/ad/4', billsController.getAdvancedQueries4);

router.post('/', billsController.createBill);
router.put('/', billsController.updateBill);
router.delete('/:id', billsController.deleteBill);

// export router to create an enpoint in server.js

export default router;
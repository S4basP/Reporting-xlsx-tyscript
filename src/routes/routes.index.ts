import {Router} from 'express';
import { getInformationProduct, registrerProduct } from '../controllers/db.controller';

const router = Router();

router.get('/getInformation', getInformationProduct);

router.post('/add_Product', registrerProduct);



export default router; 
import { Router } from 'express';

import { justifierRouter } from './justify';
import { tokenRouter } from './userToken';


const router = Router();
router.use('/', justifierRouter);
router.use('/', tokenRouter);


export { router };
import { Router } from 'express';
import userRoute from './user';
import accountRoute from './account';

const router = new Router();

router.use('/v1', userRoute);
router.use('/v1', accountRoute);


export default router;

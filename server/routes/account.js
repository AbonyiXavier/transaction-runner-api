import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken';
import AccountController from '../controllers/account.controller';
const { transferFund, depositMoney, index } = AccountController;

const router = new Router();

router.post('/accounts/transfer', verifyToken, transferFund);
router.post('/accounts/deposit', verifyToken, depositMoney);
router.get('/accounts', verifyToken, index);

export default router;

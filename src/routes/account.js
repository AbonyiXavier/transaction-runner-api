import { Router } from 'express';
import verifyToken from '../middlewares/verifyToken';
import AccountController from '../controllers/account.controller';
const { transferFund, depositMoney, index, fetchTrxn, fetchTrxnById, fetchAccBYId } = AccountController;

const router = new Router();

router.post('/accounts/transfer', verifyToken, transferFund);
router.post('/accounts/deposit', verifyToken, depositMoney);
router.get('/accounts', verifyToken, index);
router.get('/accounts/:id', verifyToken, fetchAccBYId);
router.get('/transactions', verifyToken, fetchTrxn);
router.get('/transactions/:id', verifyToken, fetchTrxnById);

export default router;

import model from '../database/models';
import { v4 } from 'uuid';

import {
  successfulResponse,
  forbiddenResponse,
  badRequestResponse,
  serverErrorResponse,
} from '../helper/response';

import { fetchAccount,fetchTransaction, fetchTransactionById, fetchAccountById } from '../services/account/account.service';

export default class AccountController {
  static async transferFund(req, res) {
    const t = await model.sequelize.transaction();

    try {
      const { account_number, amount } = req.body;
      const { id: userId } = req.user.payload;

      // Get user balance
      const accountDetails = await model.Accounts.findOne(
        {
          where: { userId: req.user.payload.id },
        },
        { transaction: t }
      );
      const { balance } = accountDetails.dataValues;
      const { id: senderId } = accountDetails.dataValues;

      const amt = parseFloat(balance);

      // checking user account amount against the one he wants to send
      if (amt < amount) {
        return forbiddenResponse({
          res,
          message: 'oops! Insufficient balance',
        });
      }

      // subtract user amount from his wallet to what he/she is sending and update his/her account
      const newBalance = amt - parseFloat(amount);

      await model.Accounts.update(
        {
          balance: newBalance,
        },
        {
          where: {
            userId,
          },
        },
        { transaction: t }
      );

      // Check for user wallet he wants to send to(the receiver wallet id)
      const account = await model.Accounts.findOne(
        {
          where: { account_number },
        },
        { transaction: t }
      );
      if (!account) {
        return {
          message: 'sorry! invalid account detail',
        };
      }
      const { balance: bal } = account.dataValues;
      const { id: receiverId } = account.dataValues;

      const money = parseFloat(bal);

      // Sum the money and update the account of the receiver
      const newBal = money + parseFloat(amount);

      await model.Accounts.update(
        {
          balance: newBal,
        },
        {
          where: {
            account_number,
          },
        },
        { transaction: t }
      );

      // debit the sender
      await model.Transactions.create(
        {
          type: 'debit',
          purpose: 'transfer',
          amount,
          reference: v4(),
          userId: userId,
          accountId: senderId,
          description: `${req.user.payload.full_name} your account has been debited with the sum of ${amount}`,
          previous_balance: Number(balance),
          current_balance: newBalance,
          created_at: Date.now(),
          updated_at: Date.now(),
        },
        { transaction: t }
      );

      // credit the receiver
      await model.Transactions.create(
        {
          type: 'credit',
          purpose: 'transfer',
          amount,
          reference: v4(),
          userId: userId,
          accountId: receiverId,
          description: `Your account was credited by ${req.user.payload.full_name} with the sum of ${amount}`,
          previous_balance: Number(bal),
          current_balance: Number(bal) + Number(amount),
          created_at: Date.now(),
          updated_at: Date.now(),
        },
        { transaction: t }
      );

      await t.commit();

      return successfulResponse({
        res,
        message: 'transfer successfully',
      });
    } catch (error) {
      await t.rollback();
      console.log('error', error);
      return serverErrorResponse({
        res,
        message: 'something went wrong',
      });
    }
  }

  static async depositMoney(req, res) {
    const t = await model.sequelize.transaction();

    try {
      const { id: userId } = req.user.payload;
      const accountDetails = await model.Accounts.findOne(
        {
          where: { userId: req.user.payload.id },
        },
        { transaction: t }
      );

      const data = {
        account_number: accountDetails.dataValues.account_number,
        amount: req.body.amount,
      };

      const { balance } = accountDetails.dataValues;

      const { id: accountId } = accountDetails.dataValues;

      const money = parseFloat(balance);
      const newBal = money + parseFloat(data.amount);

      await model.Accounts.update(
        {
          balance: newBal,
        },
        {
          where: {
            account_number: data.account_number,
          },
        },
        { transaction: t }
      );

      // deposit to wowner account
      await model.Transactions.create(
        {
          type: 'credit',
          purpose: 'deposit',
          amount: data.amount,
          userId: userId,
          accountId: accountId,
          reference: v4(),
          description: ` ${req.user.payload.full_name} You credited your account with the sum of ${data.amount}`,
          previous_balance: Number(balance),
          current_balance: newBal,
          created_at: Date.now(),
          updated_at: Date.now(),
        },
        { transaction: t }
      );

      await t.commit();

      return successfulResponse({
        res,
        message: 'deposit successfully',
      });
    } catch (error) {
      console.log('error', error);
      return serverErrorResponse({
        res,
        message: 'something went wrong',
      });
    }
  }
  
  static async index(req, res) {
    try {
      const { status, message, data } = await fetchAccount();

      if (status) {
        return successfulResponse({
          res,
          message,
          data,
        });
      }
    } catch (error) {
      console.log('error', error);
      return serverErrorResponse({
        res,
        message: 'something went wrong',
      });
    }
  }
  
  static async fetchAccBYId(req, res) {
    try {
      const { id } = req.params
      const { status, message, data } = await fetchAccountById(id);

      if (status) {
        return successfulResponse({
          res,
          message,
          data,
        });
      }
    } catch (error) {
      console.log('error', error);
      return serverErrorResponse({
        res,
        message: 'something went wrong',
      });
    }
  }
  
  static async fetchTrxn(req, res) {
    try {
      const { status, message, data } = await fetchTransaction();

      if (status) {
        return successfulResponse({
          res,
          message,
          data,
        });
      }
    } catch (error) {
      console.log('error', error);
      return serverErrorResponse({
        res,
        message: 'something went wrong',
      });
    }
  }

  static async fetchTrxnById(req, res) {
    try {
      const { id } = req.params
      const { status, message, data } = await fetchTransactionById(id);

      if (status) {
        return successfulResponse({
          res,
          message,
          data,
        });
      }
    } catch (error) {
      console.log('error', error);
      return serverErrorResponse({
        res,
        message: 'something went wrong',
      });
    }
  }
}

import { v4 } from 'uuid';
import models from '../database/models';

async function creditAccount({ amount, account_id, purpose, reference = v4(), metadata, t }) {
  const account = await models.Accounts.findOne({ where: { id: account_id } });

  if (!account) {
    return {
      success: false,
      error: 'Account does not exist',
    };
  }

  await models.Accounts.increment(
    { balance: amount }, { where: { id: account_id }, transaction: t },
  );

  await models.Transactions.create({
    txn_type: 'credit',
    purpose,
    amount,
    account_id,
    reference,
    metadata,
    balance_before: Number(account.balance),
    balance_after: Number(account.balance) + Number(amount),
    created_at: Date.now(),
    updated_at: Date.now(),
  }, {
    transaction: t,
    lock: t.LOCK.UPDATE,
  });
  return {
    success: true,
    message: 'Credit successful',
  };
}

async function debitAccount({
  amount, account_id, purpose, reference = v4(), metadata, t,
}) {
  const account = await models.accounts.findOne({ where: { id: account_id } });

  if (!account) {
    return {
      success: false,
      error: 'Account does not exist',
    };
  }

  console.log('4')

  if (Number(account.balance) < amount) {
    return {
      success: false,
      error: 'Insufficient balance',
    };
  }
  await models.accounts.increment(
    { balance: -amount }, { where: { id: account_id }, transaction: t },
  );
  await models.transactions.create({
    txn_type: 'debit',
    purpose,
    amount,
    account_id,
    reference,
    metadata,
    balance_before: Number(account.balance),
    balance_after: Number(account.balance) - Number(amount),
    created_at: Date.now(),
    updated_at: Date.now(),
  }, {
    transaction: t,
    lock: t.LOCK.UPDATE,
  });
  return {
    success: true,
    message: 'Debit successful',
  };
}

export {
    creditAccount,
    debitAccount
}
// module.exports = { creditAccount, debitAccount };
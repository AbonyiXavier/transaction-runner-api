import model from '../../database/models';

export const fetchAccount = async () => {
  try {
    const data = await model.Accounts.findAll({});

    return {
      status: true,
      message: 'account fetched successfully',
      data,
    };
  } catch (error) {
    console.log('error', error);
    return {
      status: false,
      message: 'Something went wrong',
    };
  }
};

export const fetchAccountById = async (id) => {
  try {
    const data = await model.Accounts.findOne({
      where: {
        id: id
      }
    });

    return {
      status: true,
      message: 'account fetched successfully',
      data,
    };
  } catch (error) {
    console.log('error', error);
    return {
      status: false,
      message: 'Something went wrong',
    };
  }
};

export const fetchTransaction = async () => {
  try {
    const data = await model.Transactions.findAll({});

    return {
      status: true,
      message: 'transaction fetched successfully',
      data,
    };
  } catch (error) {
    console.log('error', error);
    return {
      status: false,
      message: 'Something went wrong',
    };
  }
};

export const fetchTransactionById = async (id) => {
  try {
    const data = await model.Transactions.findOne({
      where: {
        id: id
      }
    });

    return {
      status: true,
      message: 'transaction fetched successfully',
      data,
    };
  } catch (error) {
    console.log('error', error);
    return {
      status: false,
      message: 'Something went wrong',
    };
  }
};

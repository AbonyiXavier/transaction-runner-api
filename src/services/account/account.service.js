import model from '../../database/models';

export const fetchAccount = async () => {
  try {
    const data = await model.accounts.findAll({});

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
    const data = await model.accounts.findOne({
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
    const data = await model.transactions.findAll();

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
    const data = await model.transactions.findOne({
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

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

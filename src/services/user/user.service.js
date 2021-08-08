import model from '../../database/models';
import bcrypt from 'bcryptjs';
import shortid from 'shortid';
import AuthServices from '../../helper/auth.services';
const { generateJwt } = AuthServices;

export const createUser = async (full_name, email, password) => {
  const t = await model.sequelize.transaction();

  try {
    const checkEmail = await model.Users.findOne(
      {
        where: {
          email,
        },
      },
      {
        transaction: t,
      }
    );
    if (checkEmail) {
      return {
        status: false,
        message: 'email already in use.',
      };
    }
    const userData = await model.Users.create({
      full_name,
      email,
      password: bcrypt.hashSync(password, 10),
    },{
      transaction: t,
    });

    const token = await generateJwt(userData);
    const data = {
      id: userData.id,
      full_name: userData.full_name,
      email: userData.email,
    };
    data.token = token;

  const acc =  await model.Accounts.create(
      {
        balance: 5000,
        userId: data.id,
        account_number: shortid.generate(),
      },
      {
        transaction: t,
      }
    );

    await t.commit();

    return {
      status: true,
      message: 'User created successfully!',
      data: {
        id: data.id,
        full_name: data.full_name,
        email: data.email,
        account_number: acc.account_number,
        token: data.token
      }
    };
  } catch (error) {
    console.log('error', error);
    await t.rollback();
    return {
      status: false,
      message: 'Something went wrong',
    };
  }
};


export const loginUser = async ( email ) => {
try {
  const user = await model.Users.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    return {
      status: false,
      message: 'invalid email and password',
    };
  }
  const token = await generateJwt(user);
  const data = {
    id: user.id,
    email: user.email,
  };
  data.token = token;
  return {
    status: true,
    message: 'logged in!',
    data,
  };
} catch (error) {
  return {
    status: false,
    message: 'Something went wrong',
  };
}
}

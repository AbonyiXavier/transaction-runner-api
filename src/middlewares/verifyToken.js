import jwt from 'jsonwebtoken';
import {
  unauthorizedResponse,
  serverErrorResponse,
} from '../helper/response';
const dotenv = require('dotenv');
dotenv.config();

/* eslint consistent-return: off */
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token || req.header('Authorization');
  try {
    if (!token) {
      return unauthorizedResponse({
        res,
        message: 'Access Denied'
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log('error', error);
    return serverErrorResponse({
      res,
      message: 'something went wrong'
    });
  }
};
export default verifyToken;

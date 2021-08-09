import joi from 'joi';
import model from '../database/models';
import AuthServices from '../helper/auth.services';
import {
  badRequestResponse,
  serverErrorResponse,
} from '../helper/response';
const { passwordCompare } = AuthServices;

export default class Validation {
  static async validateSignupDetails(req, res, next) {
    try {
      const schema = joi.object().keys({
        full_name: joi.string().min(6).max(255).required(),
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
      });
      await schema.validateAsync(req.body);
      return next();
    } catch (error) {
      console.log('validate', error);
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
  }

  static async validateLoginDetails(req, res, next) {
    try {
      const schema = joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
      });
      await schema.validateAsync(req.body);
      return next();
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }
  }

  static async validatePassword(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await model.users.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return badRequestResponse({
          res,
          message: 'Invalid email/password combination.',
        });
      }
      const passwordMatch = await passwordCompare(user.password, password);

      if (!passwordMatch) {
        return badRequestResponse({
          res,
          message: 'Incorrect email/password combination.',
        });
      }
      return next();
    } catch (error) {
      console.log('error', error);

      return serverErrorResponse({
        res,
        message: 'something went wrong',
      });
    }
  }
}

import {
  successfulResponse,
  createdResponse,
  badRequestResponse,
  serverErrorResponse,
} from '../helper/response';
import { createUser, loginUser } from '../services/user/user.service';

export default class UserController {
  static async signup(req, res) {
    try {
      const { full_name, email, password } = req.body;
      const { status, message, data } = await createUser(
        full_name,
        email,
        password
      );

      if (!status) {
        return badRequestResponse({
          res,
          message,
        });
      }

      res.cookie('token', data.token);

      return createdResponse({
        res,
        message,
        data,
      });
    } catch (err) {
      console.log('err', err);
      return serverErrorResponse({
        res,
        message: 'something went wrong',
      });
    }
  }

  static async login(req, res) {
    try {
      const { email } = req.body;

      const { status, message, data } = await loginUser(email);

      if (!status) {
        return badRequestResponse({
          res,
          message,
        });
      }

      res.cookie('token', data.token);
      res.header('Authorization', data.token);

      return successfulResponse({
        res,
        message,
        data,
      });
    } catch (err) {
      console.log('err', err);
      return serverErrorResponse({
        res,
        message: 'something went wrong',
      });
    }
  }
}

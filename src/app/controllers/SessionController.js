import * as yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import auhtConfig from '../../authConfig';

class SessionController {
  // eslint-disable-next-line class-methods-use-this
  async store(req, res) {
    // validation
    const schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .required()
        .min(6),
    });
    const validation = schema.isValid(req.body);
    if (!validation) return res.status(400).json({ error: 'Validation fails!' });

    const { email, password } = req.body;
    // check if exists
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: 'User not found!' });


    // check password
    const checkPass = await user.checkPassword(password);
    if (!checkPass) return res.status(400).json({ error: 'Password does not match' });

    // jwt
    const { id } = user;
    const token = jwt.sign({ id }, auhtConfig.secret, {
      expiresIn: auhtConfig.expiresIn,
    });

    return res.header(token).json({
      user,
      token,
    });
  }
}

export default new SessionController();

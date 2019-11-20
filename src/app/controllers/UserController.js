import * as yup from 'yup';
import User from '../models/User';

class UserController {
  // eslint-disable-next-line class-methods-use-this
  async store(req, res) {
    // validation
    const schema = yup.object().shape({
      name: yup
        .string()
        .required(),
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
    if (!validation) return res.status(400).json({ error: 'Validation fails' });

    // check if exists
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) return res.status(400).json({ error: 'User already exists' });


    const user = await User.create(req.body);

    return res.json(user);
  }
}

export default new UserController();

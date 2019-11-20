import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      age: Sequelize.NUMBER,
      height: Sequelize.NUMBER,
      weight: Sequelize.NUMBER,
    },
    {
      sequelize,
    });
    return this;
  }
}
export default Student;

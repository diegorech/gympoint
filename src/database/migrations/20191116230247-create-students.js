'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.createTable('students', { 
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          email: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true,
          },
          age: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          height: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          weight: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
          } 
      });
     
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('users');
     
  }
};

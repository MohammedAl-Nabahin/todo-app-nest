'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      // createdAt: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      // },
      // updatedAt: {
      //   type: Sequelize.DATE,
      //   allowNull: false,
      // },
      // onUpdate: 'CASCADE',
      // onDelete: 'CASCADE',
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('User');
  },
};

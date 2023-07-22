'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
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
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE',
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Task');
  },
};

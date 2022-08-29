'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('global_settings', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sysName: Sequelize.DataTypes.STRING,
      value_bool: Sequelize.DataTypes.BOOLEAN,
      value_int: Sequelize.DataTypes.INTEGER,
      value_float: Sequelize.DataTypes.FLOAT,
      value_date: Sequelize.DataTypes.DATE,
      value_string: Sequelize.DataTypes.STRING,
      type: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('global_settings');
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('original_collections', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      contract: Sequelize.DataTypes.STRING,
      name: Sequelize.DataTypes.STRING,
      slug: {
        unique: true,
        type: Sequelize.DataTypes.STRING
      },
      total_volume: Sequelize.DataTypes.FLOAT,
      items_count: Sequelize.DataTypes.INTEGER,
      priority: Sequelize.DataTypes.INTEGER,
      setting_listener: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('original_collections');
  }
};

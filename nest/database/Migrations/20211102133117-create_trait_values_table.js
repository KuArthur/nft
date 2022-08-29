'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('trait_values', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      trait_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'traits', key: 'id', onDelete: 'CASCADE', }
      },
      asset_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'assets', key: 'id', onDelete: 'CASCADE', }
      },
      type: Sequelize.DataTypes.STRING,
      value: Sequelize.DataTypes.STRING,
      count: Sequelize.DataTypes.INTEGER,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('trait_values');
  }
};

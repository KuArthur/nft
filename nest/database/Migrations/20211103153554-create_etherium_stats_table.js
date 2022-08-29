'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('etherium_stats', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      gasPrice: Sequelize.DataTypes.INTEGER,
      etheriumPrice: Sequelize.DataTypes.INTEGER,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('etherium_stats');
  }
};

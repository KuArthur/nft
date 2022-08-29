'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('traits', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      collection_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'collections', key: 'id', onDelete: 'CASCADE', }
      },
      type: Sequelize.DataTypes.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('traits');
  }
};

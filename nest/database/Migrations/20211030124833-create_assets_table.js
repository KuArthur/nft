'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('assets', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: Sequelize.DataTypes.STRING,
      original_collection_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'original_collections', key: 'id', onDelete: 'CASCADE', }
      },
      collection_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'collections', key: 'id', onDelete: 'CASCADE', }
      },
      token_id: Sequelize.DataTypes.INTEGER,
      image_url: Sequelize.DataTypes.STRING,
      contract: Sequelize.DataTypes.STRING,
      owner_address: Sequelize.DataTypes.STRING,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('assets');
  }
};

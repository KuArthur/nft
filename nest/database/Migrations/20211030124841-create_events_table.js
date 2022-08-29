'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('events', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      inner_id: Sequelize.DataTypes.INTEGER,
      type: Sequelize.DataTypes.SMALLINT,
      asset_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'assets', key: 'id', onDelete: 'CASCADE', }
      },
      original_collection_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'original_collections', key: 'id', onDelete: 'CASCADE', }
      },
      collection_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'collections', key: 'id', onDelete: 'CASCADE', }
      },
      total_price: Sequelize.DataTypes.BIGINT,
      ether_price: Sequelize.DataTypes.FLOAT,
      ending_price: Sequelize.DataTypes.FLOAT,
      winner_account: Sequelize.DataTypes.STRING,
      transaction_time: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
    }).then(() => queryInterface.addIndex('events', ['transaction_time', 'type']));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('events');
  }
};

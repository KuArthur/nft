'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('original_collections', 'collection_id', {
      type: Sequelize.DataTypes.INTEGER,
      references: { model: 'collections', key: 'id', onDelete: 'CASCADE', }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('original_collections', 'collection_id')
  }
};

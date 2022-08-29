'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('collections', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      original_collection_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'original_collections', key: 'id', onDelete: 'CASCADE', }
      },
      slug: {
        unique: true,
        type: Sequelize.DataTypes.STRING
      },
      name: Sequelize.DataTypes.STRING,
      image_url: Sequelize.DataTypes.STRING,
      contract: Sequelize.DataTypes.STRING,
      link_opensea: Sequelize.DataTypes.STRING,
      link_website: Sequelize.DataTypes.STRING,
      link_discord: Sequelize.DataTypes.STRING,
      link_twitter: Sequelize.DataTypes.STRING,
      mint: Sequelize.DataTypes.FLOAT,
      art_blocks: Sequelize.DataTypes.INTEGER,
      show_collection: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true,
      },
      parse_collection: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('collections');
  }
};

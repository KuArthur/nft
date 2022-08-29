'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('temp_stats_1h_add', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      collection_id: {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'collections', key: 'id', onDelete: 'CASCADE', },
      },
      collection_stat_id: {
        type: Sequelize.DataTypes.INTEGER,
      },
      one_day_volume: Sequelize.DataTypes.FLOAT,
      one_day_change: Sequelize.DataTypes.FLOAT,
      one_day_sales: Sequelize.DataTypes.INTEGER,
      one_day_average_price: Sequelize.DataTypes.FLOAT,
      seven_day_volume: Sequelize.DataTypes.FLOAT,
      seven_day_change: Sequelize.DataTypes.FLOAT,
      seven_day_sales: Sequelize.DataTypes.INTEGER,
      seven_day_average_price: Sequelize.DataTypes.FLOAT,
      thirty_day_volume: Sequelize.DataTypes.FLOAT,
      thirty_day_change: Sequelize.DataTypes.FLOAT,
      thirty_day_sales: Sequelize.DataTypes.INTEGER,
      thirty_day_average_price: Sequelize.DataTypes.FLOAT,
      total_volume: Sequelize.DataTypes.FLOAT,
      total_sales: Sequelize.DataTypes.INTEGER,
      total_supply: Sequelize.DataTypes.INTEGER,
      count: Sequelize.DataTypes.INTEGER,
      num_owners: Sequelize.DataTypes.INTEGER,
      average_price: Sequelize.DataTypes.FLOAT,
      num_reports: Sequelize.DataTypes.INTEGER,
      market_cap: Sequelize.DataTypes.FLOAT,
      floor_price: Sequelize.DataTypes.FLOAT,
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
      },
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('temp_stats_1h_add');
  }
};

'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('collection_stats', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            collection_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: { model: 'collections', key: 'id', onDelete: 'CASCADE', },
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
            createdAt: Sequelize.DataTypes.DATE,
            updatedAt: Sequelize.DataTypes.DATE,
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('collection_stats');
    }
};

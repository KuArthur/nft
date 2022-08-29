'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('collection_list_values', {
            collection_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: { model: 'collections', key: 'id', onDelete: 'CASCADE' },
            },
            asset_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: { model: 'assets', key: 'id', onDelete: 'CASCADE' },
                primaryKey: true,
            },
            price: {
                type: Sequelize.DataTypes.FLOAT,
                allowNull: true
            },
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('collection_list_values');
    }
};

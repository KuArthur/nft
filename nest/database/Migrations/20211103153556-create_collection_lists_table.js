'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('collection_lists', {
            event_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: { model: 'events', key: 'id', onDelete: 'CASCADE', }
            },
            collection_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: { model: 'collections', key: 'id', onDelete: 'CASCADE', },
                primaryKey: true,
            },
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('collection_lists');
    }
};

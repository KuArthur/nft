'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('events', 'floor', {
                type: Sequelize.DataTypes.FLOAT,
            }),
            queryInterface.addColumn('events', 'list', {
                type: Sequelize.DataTypes.INTEGER,
            }),
            queryInterface.addColumn('events', 'price', {
                type: Sequelize.DataTypes.FLOAT,
            }),
            queryInterface.addColumn('events', 'volume', {
                type: Sequelize.DataTypes.FLOAT,
            })
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('events', 'floor'),
            queryInterface.removeColumn('events', 'list'),
            queryInterface.removeColumn('events', 'price'),
            queryInterface.removeColumn('events', 'volume'),
        ])
    }
};

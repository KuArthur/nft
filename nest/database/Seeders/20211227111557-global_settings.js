'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('global_settings', [
      {
        sysName: 'parserLastUpdate',
        type: 'date'
      },
      {
        sysName: 'parserShouldContinueAfterError',
        type: 'bool'
      },
      {
        sysName: 'parserCheckTimeout',
        type: 'int'
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('global_settings', null, {});
  }
};

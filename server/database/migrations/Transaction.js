module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.sequelize
      .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
      .then(() =>
        queryInterface.createTable('Transactions', {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
          },
          userId: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          accountId: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          type: {
            allowNull: false,
            type: Sequelize.ENUM('credit', 'debit'),
          },
          purpose: {
            type: Sequelize.ENUM('deposit', 'transfer', 'withdrawal'),
            allowNull: false,
          },
          amount: {
            allowNull: false,
            type: Sequelize.DECIMAL,
          },
          reference: {
            type: Sequelize.UUID,
            allowNull: false,
          },
          previous_balance: {
            allowNull: false,
            type: Sequelize.DECIMAL,
          },
          current_balance: {
            allowNull: false,
            type: Sequelize.DECIMAL,
          },
          description: {
            allowNull: true,
            type: Sequelize.STRING,
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'created_at',
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
            field: 'updated_at',
          },
        })
      );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.dropTable('Transactions');
  },
};

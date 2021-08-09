module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('transactions', {
    type: {
      type: DataTypes.ENUM('credit', 'debit'),
      allowNull: false,
    },
    purpose: {
      type: DataTypes.ENUM('deposit', 'transfer', 'withdrawal'),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    reference: {
      type: DataTypes.UUID,
      unique: true,
    },
    previous_balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    current_balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at',
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at',
      defaultValue: DataTypes.NOW,

    },
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.users, {
      as: 'user',
      foreignKey: 'userId',
      onDelete: 'cascade',
    });
    Transaction.belongsTo(models.accounts, {
      as: 'account',
      foreignKey: 'accountId',
      onDelete: 'cascade',
    });
  };
  return Transaction;
};

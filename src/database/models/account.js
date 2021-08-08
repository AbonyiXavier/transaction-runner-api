module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Accounts', {
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    account_number: {
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

  Account.associate = (models) => {
    Account.belongsTo(models.Users, {
      as: 'user',
      foreignKey: 'userId',
      onDelete: 'cascade',
    });
    Account.hasMany(models.Transactions, {
      as: 'account',
      foreignKey: 'accountId',
      onDelete: 'cascade',
    });
  };
  return Account;
};

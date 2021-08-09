module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
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

  // User.associate = (models) => {
  //   User.hasMany(models.transactions, {
  //     onDelete: 'cascade',
  //     hooks: true,
  //   });
  //   User.hasOne(models.accounts, {
  //     onDelete: 'cascade',
  //     hooks: true,
  //   });
  // };

  return User;
};

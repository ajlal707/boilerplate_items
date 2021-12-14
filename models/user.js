'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        firstName: { field: 'first_name', type: DataTypes.STRING, name: 'first_name' },
        lastName: { field: 'last_name', type: DataTypes.STRING, name: 'last_name' },
        username: { field: 'username', type: DataTypes.STRING },
        email: { field: 'email', type: DataTypes.STRING },
        password: { field: 'password', type: DataTypes.STRING },
        gender: { field: 'gender', type: DataTypes.STRING },
        birthDate: { field: 'birth_date', type: DataTypes.STRING },
        contactNo: { field: 'contact_no', type: DataTypes.STRING },
        country: { field: 'country', type: DataTypes.STRING },
        role: { field: 'role', type: DataTypes.STRING },
        isConfirmed: { field: 'is_confirmed', type: DataTypes.BOOLEAN },
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    User.associate = function (models) {
        User.hasMany(models.UserSession);
    };

    return User;
};

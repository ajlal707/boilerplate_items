'use strict';
module.exports = (sequelize, DataTypes) => {

    const Employes = sequelize.define('employes', {
        firstName: { field: 'first_name', type: DataTypes.STRING, name: 'first_name' },
        lastName: { field: 'last_name', type: DataTypes.STRING, name: 'last_name' },
        email: { field: 'email', type: DataTypes.STRING },
        contactNo: { field: 'contact_no', type: DataTypes.STRING },
        role: { field: 'role', type: DataTypes.ENUM(['admin', 'store manager', 'cashier', 'back office']) },
        pin: { field: 'pin', type: DataTypes.INTEGER },
        store_id: { field: 'store_id', type: DataTypes.INTEGER },
        password: { field: 'password', type: DataTypes.STRING },
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Employes.associate = function (models) {
        Employes.belongsTo(models.Stores, { as: 'stores', foreignKey: 'store_id' });
        Employes.hasOne(models.UserSession, { foreignKey: 'user_id' });
        Employes.hasMany(models.EmployeAttendance, { as: 'employe_attendance', foreignKey: 'employe_id' });
        Employes.hasMany(models.Shift, { as: 'shifts', foreignKey: 'employe_id' });

    };

    return Employes;
};

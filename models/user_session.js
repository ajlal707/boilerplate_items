'use strict';
module.exports = (sequelize, DataTypes) => {
    const UserSession = sequelize.define('user_sessions', {
        userId: { field: 'user_id', type: DataTypes.INTEGER },
        accessToken: { field: 'access_token', type: DataTypes.STRING },
        refreshToken: { field: 'refresh_token', type: DataTypes.STRING },
        isRevoked: { field: 'is_revoked', type: DataTypes.BOOLEAN }
    }, {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    UserSession.associate = function(models) {
        UserSession.belongsTo(models.User, {foreignKey: 'user_id'});
        UserSession.belongsTo(models.Employes, {foreignKey: 'user_id'});
    };
    return UserSession;
};

import {DataTypes} from "sequelize";
import {trueMusicDb} from "../databases/db.js";
export async function runMigrations() {
    const queryInterface = trueMusicDb.getQueryInterface()
    await queryInterface.createTable('user_liked_tracks', {
        userId: {
            type: DataTypes.INTEGER,
            references: {model: 'users', key: 'id'},
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        trackId: {
            type: DataTypes.INTEGER,
            references: {model: 'tracks', key: 'id'},
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    })
}




const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class horseCharacter extends Model { }

horseCharacter.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        horse_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        horse_breed: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        horse_power: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
                min: 1,
                max: 10

            }
        },

        horse_speed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
                min: 1,
                max: 10
            }
        },

        horse_smarts: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
                min: 1,
                max: 10
            }
        },
        horse_weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isNumeric: true,
                min: 1,
                max: 2000
            }
        },
        likeCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,  // Set default value to 0
        },
        horse_description: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [0, 1500]
            }
        },
        horse_image: {
            type: DataTypes.STRING
        }
    },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'horseCharacter',
    }
);

module.exports = horseCharacter;
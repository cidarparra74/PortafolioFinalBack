import { DataTypes } from 'sequelize';
import db from '../db/conectionConfig';

const experience = db.define(
    "experiencia_laboral",
    {
        idexperiencia_laboral: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
        },
        nombre: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
        },
        url: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
            validate: {
                isUrl: true,
            },
        },
        foto: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        tableName: 'experiencia_laboral',
        

    }
);

export default experience;

import { DataTypes, Model } from "sequelize";
import db from "../db/conectionConfig";
import User from "./user";

const project = db.define(
  "proyectos",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.INTEGER,
    },
    descripcion: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    imagen: {
      type: DataTypes.STRING,
    },
    fecha: {
      type: DataTypes.DATE,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
    },
  },

  {
    tableName: "proyectos",
  }
);

project.belongsTo(User, {
  foreignKey: "usuario_id",
});

export default project;

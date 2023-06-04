import { Model, DataTypes, TIME } from "sequelize";
import db from "../db/conectionConfig";


class users extends Model {
  public idusuario!: number;
  public nombre!: string;
  public email!: string;
  public contrasenia!: string;
  public foto!: string;
  public estado!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

users.init(
  {
    idusuario: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    contrasenia: {
      type: DataTypes.STRING,
    },
    foto: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.TINYINT,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: db, 
        tableName: 'usuarios',
  }
);



export default users;
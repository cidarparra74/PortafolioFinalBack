import { DataTypes, Model } from "sequelize";
import sequelize from "../db/conectionConfig";

interface TecnologiaAttributes {
  idtecnologia: number;
  nombre: string;
  imagen: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

class Tecnology
  extends Model<TecnologiaAttributes>
  implements TecnologiaAttributes
{
  public idtecnologia!: number;
  public nombre!: string;
  public imagen!: string | null;
  public createdAt!: Date | null;
  public updatedAt!: Date | null;
}

Tecnology.init(
  {
    idtecnologia: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    imagen: {
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
    tableName: "tecnologias",
    sequelize,
  }
);

export default Tecnology;

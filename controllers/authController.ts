import { Request, Response, NextFunction } from "express";
import Usuario from "../models/user";
import bcryptjs from "bcryptjs";
import generarJWT from "../utils/generarJWT";

export const login = async (req: Request, res: Response) => {
  const { nombre, contrasenia } = req.body;

  try {
    const usuario = await Usuario.findOne({
      where: {
        nombre,
      },
    });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario o contraseña no son correctos",
      });
    }

    if (usuario.dataValues.estado == 0) {
      return res.status(400).json({
        msg: "Usuario inactivo",
      });
    }

    const validPassword = bcryptjs.compareSync(
      contrasenia,
      usuario.dataValues.contrasenia
    );

    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario o contraseña no son correctos",
      });
    }

    const token = await generarJWT(usuario.dataValues.idusuario);
    res.json({
      token,
      usuario: usuario.dataValues,
      msg: "ingreso al login",
    });
  } catch (error) {
    res.status(500).json({
      error,
      msg: "error en el login",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.json({
    msg: "El usuario cerro sesión correctamente",
  });
};

export const validateToken = async (req: Request, res: Response) => {
  const { uid } = req.body;

  const usuario = await Usuario.findByPk(uid);

  if (!usuario) {
    return res.status(400).json({
      msg: "Usuario no existe",
    });
  }

  res.json({
    usuario,
    msg: "El usuario cerro sesión correctamente",
  });
};

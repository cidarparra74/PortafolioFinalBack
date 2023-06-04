import { Response, Request, request } from "express";
import bcryptjs from "bcryptjs";
import users from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  const {} = req.params;
  try {
    const result = await users.findAll();

    if (result.length === 0) {
      res.status(404).json({ message: "No se encontraron usuarios." });
      return;
    }
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios." });
  }
};
export const getUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const resultId = await users.findByPk(id);

  if (resultId) {
    res.status(200).json({
      msg: "Usuario Encontrado con el ID:" + id,
      resultId,
    });
  } else {
    res.status(404).json({
      msg: "No se encuentra el usuario con el ID:" + id,
    });
  }
};

export const postUser = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { nombre, email, contrasenia, foto, estado } = req.body;
    const createdAt = new Date();
    const updatedAt = new Date();
    const salt = bcryptjs.genSaltSync();
    body.contrasenia = bcryptjs.hashSync(body.contrasenia, salt);

    const result = await users.create({
      nombre,
      email,
      contrasenia,
      foto,
      estado,
      createdAt,
      updatedAt,
    });

    res.status(202).json({
      success: true,
      Message: "Usuario creado",
      data: result,
      body,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Error al crear el usuario" });
  }
};

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { nombre, email, contrasenia, foto, estado } = req.body;

  try {
    const result = await users.findByPk(id);

    if (!result) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    if (email) {
      result.email = email;
    }
    if (nombre) {
      result.nombre = nombre;
    }
    if (contrasenia) {
      result.contrasenia = contrasenia;
    }
    if (foto) {
      result.foto = foto;
    }
    if (estado) {
      result.estado = estado;
    }
    result.updatedAt = new Date();

    await result.save();

    res.json({
      success: true,
      message: "Usuario actualizado exitosamente",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
export const deleteUserID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "El parámetro ID es requerido" });
    }

    const deletedRows = await users.destroy({
      where: {
        idusuario: id,
      },
    });

    if (deletedRows === 0) {
      return res
        .status(404)
        .json({ error: `No se encontró ningún usuario con ID ${id}` });
    }

    res.json({ message: `Usuario con ID ${id} eliminado correctamente` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

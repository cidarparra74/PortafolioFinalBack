import { Request, Response } from "express";
import Tecnology from "../models/tecnology";

export const getTecnologias = async (req: Request, res: Response) => {
  try {
    const tecnologias = await Tecnology.findAll();
    res.status(200).json({ data: tecnologias });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tecnologías." });
  }
};

export const getTecnologiaById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const tecnologia = await Tecnology.findByPk(id);

    if (tecnologia) {
      res.status(200).json({ data: tecnologia });
    } else {
      res
        .status(404)
        .json({ message: "Tecnología no encontrada con ID:." + id });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la tecnología." });
  }
};

export const postTecnologia = async (req: Request, res: Response) => {
  const { idtecnologia, nombre, imagen } = req.body;

  try {
    const tecnologia = await Tecnology.create({ idtecnologia, nombre, imagen });
    res.status(201).json({ data: tecnologia });
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tecnología." });
  }
};

export const putTecnologia = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, imagen } = req.body;

  try {
    const tecnologia = await Tecnology.findByPk(id);

    if (!tecnologia) {
      res
        .status(404)
        .json({ message: "Tecnología no encontrada con ID." + id });
      return;
    }

    tecnologia.nombre = nombre || tecnologia.nombre;
    tecnologia.imagen = imagen || tecnologia.imagen;

    await tecnologia.save();

    res.status(200).json({ data: tecnologia });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la tecnología." });
  }
};

export const deleteTecnologia = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const tecnologia = await Tecnology.findByPk(id);

    if (!tecnologia) {
      res
        .status(404)
        .json({ message: "Tecnología no encontrada con ID." + id });
      return;
    }

    await tecnologia.destroy();

    res.status(200).json({
      message: "Tecnología eliminada con ID: " + id + "  Correctamente ",
    });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tecnología." + id });
  }
};

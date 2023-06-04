import { Request, Response } from "express";
import project from "../models/projects";

export const getProjects = async (req: Request, res: Response) => {
  const {} = req.params;

  try {
    const proyectos = await project.findAll();

    if (proyectos.length === 0) {
      res.status(404).json({ message: "No se encontraron proyectos." });
      return;
    }

    res.status(200).json({
      data: proyectos,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los proyectos." });
  }
};

export const getProjectID = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const proyecto = await project.findByPk(id);

    if (!proyecto) {
      res.status(404).json({ message: "Proyecto no encontrado." + id });
      return;
    }

    res.status(200).json({
      msg: "Proyecto encontrado con el ID:." + id,
      data: proyecto,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el proyecto." + id });
  }
};

export const postProject = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, url, imagen, fecha, usario_id } = req.body;

    const proyecto = await project.create({
      nombre,
      descripcion,
      url,
      imagen,
      fecha,
      usario_id,
    });

    res.status(201).json({ data: proyecto });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el proyecto." });
  }
};

export const putProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const filename = req.params.filename;
    body.foto = filename;

    const result = await project.update(body, {
      where: {
        id: id,
      },
    });

    if (result[0] === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró el proyecto para actualizar." });
    }

    res.json({
      success: true,
      message: "El proyecto se actualizó correctamente.",
      id: id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error al actualizar el proyecto." });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const proyecto = await project.findByPk(id);

    if (!proyecto) {
      res.status(404).json({ message: "Proyecto no encontrado." });
      return;
    }

    await proyecto.destroy();

    res.status(200).json({ message: "Proyecto eliminado exitosamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el proyecto." });
  }
};

import { Request, Response } from 'express';
import experience from '../models/experience';


export const getExperience = async (req: Request, res: Response) => {
    try {
        const experiencias = await experience.findAll();
        res.status(200).json({ data: experiencias });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las experiencias laborales.' });
    }
};


export const postExperience = async (req: Request, res: Response) => {
    const {   fecha_inicio, descripcion, nombre, url, foto } = req.body;

    try {
        const experiencia = await experience.create({
             
            fecha_inicio,
            descripcion,
            nombre,
            url,
            foto,
        });

        res.status(201).json({ data: experiencia });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la experiencia laboral.' });
    }
};


export const getExperienceID = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const experiencia = await experience.findByPk(id);

        if (!experiencia) {
            res.status(404).json({ message: 'Experiencia laboral no encontrada.' });
            return;
        }

        res.status(200).json({ data: experiencia });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la experiencia laboral.' });
    }
};



export const putExperience= async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const filename = req.params.filename;
        body.foto = filename;
        const result = await experience.update(body, {
            where: {
                idexperiencia_laboral: id
            }
        });

        if (result[0] === 0) {
            return res.status(404).json({ error: 'No se encontró la experiencia laboral para actualizar.' });
        }

        res.json({
            success: true,
            message: 'Experiencia laboral se actualizó correctamente.',
            idexperiencia_laboral: id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hubo un error al actualizar la experiencia laboral.' });
    }
};


export const deleteExperience = async (req: Request, res: Response) => {
    const { id} = req.params;

    try {
        const experiencia = await experience.findByPk(id);

        if (!experiencia) {
            res.status(404).json({ message: 'Experiencia laboral no encontrada.' });
            return;
        }

        await experiencia.destroy();

        res.status(200).json({ message: 'Experiencia laboral eliminada correctamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la experiencia laboral.' });
    }
};
 
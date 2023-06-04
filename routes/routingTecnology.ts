import express from 'express';
import {
    getTecnologias,
    getTecnologiaById,
    postTecnologia,
    putTecnologia,
    deleteTecnologia,
} from '../controllers/tecnologyController';

const tecnologyRoutes = express.Router();

tecnologyRoutes.get('/', getTecnologias);
tecnologyRoutes.get('/:id', getTecnologiaById);
tecnologyRoutes.post('/', postTecnologia);
tecnologyRoutes.put('/:id', putTecnologia);
tecnologyRoutes.delete('/:id', deleteTecnologia);

export default tecnologyRoutes;

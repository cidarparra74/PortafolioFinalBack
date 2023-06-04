import { Router } from "express";
import {
    getProjects,
    getProjectID,
    postProject,
    putProject,
    deleteProject  } from "../controllers/projectsController\"";


const projectsRoutes = Router();

projectsRoutes.get('/', getProjects);
projectsRoutes.get('/:id', getProjectID);
projectsRoutes.post('/', postProject);
projectsRoutes.put('/:id', putProject);
projectsRoutes.delete('/:id', deleteProject);

export default projectsRoutes;

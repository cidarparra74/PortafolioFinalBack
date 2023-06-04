import express from 'express';
import {
  getExperience,
  postExperience,
  getExperienceID,
  putExperience,
  deleteExperience,
} from '../controllers/experienceController';

const experienceRoutes = express.Router();
experienceRoutes.get('/', getExperience);
experienceRoutes.post('/', postExperience);
experienceRoutes.get('/:id', getExperienceID);
experienceRoutes.put('/:id', putExperience);
experienceRoutes.delete('/:id', deleteExperience);

export default experienceRoutes;

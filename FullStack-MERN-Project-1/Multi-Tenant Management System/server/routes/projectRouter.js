// external libraries/modules/packages:
import express from 'express';

// internal libraries/modules/packages:
import {
	addProject,
	getAllProjects,
	getProjectById,
	updateProjectById,
	deleteProjectById,
} from '../controllers/projectController.js';
import validate from '../middlewares/validate-middleware.js';
import projectValidator from '../validators/projectValidator.js';

// creating router object:
const router = express.Router();

// defining routes:
router.post('/', validate(projectValidator), addProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProjectById);
router.delete('/:id', deleteProjectById);

// exporting routes:
export default router;
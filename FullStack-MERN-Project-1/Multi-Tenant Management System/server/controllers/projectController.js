// internal packages/modules:
import Project from '../models/projectModel.js';

// Controller function to add projects:
const addProject = async (req, res, next) => {
	try {
		// getting validated data from request:
		const data = req.validatedData;

		// getting project name, organizationId and createdBy or userId for uniqueness:
		const projectData = { data };   // since whole data is needed here, we will be getting whole data then.

		// checking if the project data already exists or not:
		const projectExists = await Project.findOne(projectData);

		// if the data already exists:
		if (!projectExists) {
			// if project data doesn't exist, we will create it:
			const project = new Project(data);

			// saving the project data into db (db operations are always in async-await):
			await project.save();
		} else {
			// if project data existed:
			return res.status(409).send({       // 409 status code for data confliction
				message: 'Project already exists',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({        // 201 status code for receiving data properly
			data: data,
			message: 'Project added successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to get all projects:
const getAllProjects = async (req, res, next) => {
	try {
		// getting all the data from the projects collection or table:
		const allProjects = await Project.find();

		// if no data exists in project collection or table:
		if (!allProjects) {
			return res.status(404).send({
				message: 'No data found in projects',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: allProjects,
			message: 'All projects fetched successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to get project by id:
const getProjectById = async (req, res, next) => {
	try {
		// getting project id from request parameters:
		const projectId = req.params.id;

		// getting project data based on id from projects collection or table:
		const projectById = await Project.findById(projectId);

		// if project data by id not found:
		if (!projectById) {
			return res.status(404).send({
				message: `Project by this id doesn't exist`,
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: projectById,
			message: 'Project by id found successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to update project by id:
const updateProjectById = async (req, res, next) => {
	try {
		// getting project id from request parameters:
		const projectId = req.params.id;

		// getting update information from user by request body:
		const updatedData = req.body;

		// finding project by id from projects collection or table and updating it:
		const updatedProject = await Project.findByIdAndUpdate(
			projectId,
			updatedData,
			{ new: true, runValidators: true },
		);

		// if project by id is not found and updated:
		if (!updatedProject) {
			return res.status(404).send({
				message: `Project by this id doesn't exist`,
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedProject,
			message: 'Project by id found and updated',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to delete project by id:
const deleteProjectById = async (req, res, next) => {
	try {
		// getting project id from the request parameters:
		const projectId = req.params.id;

		// getting data from projects collection or table based on id and deleting it:
		const deletedProject = await Project.findByIdAndDelete(projectId);

		// if project is not found by id and deleted:
		if (!deletedProject) {
			return res.status(404).send({
				message: 'Project by this id not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deletedProject,
			message: 'Project found by id and deleted',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// exporting all the controller functions:
export {
	addProject,
	getAllProjects,
	getProjectById,
	updateProjectById,
	deleteProjectById,
};
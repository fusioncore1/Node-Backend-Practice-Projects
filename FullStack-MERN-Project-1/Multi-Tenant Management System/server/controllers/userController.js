// internal packages/modules:
import User from '../models/userModel.js';

// Controller function to add users:
const addUser = async (req, res, next) => {
	try {

		// WE WILL ADD AUTHENTICATION LATER ON:

		// getting validated data from the user request:
		const data = req.validatedData;

		// getting unique data for checking if the user already exists or not:
		const userUniqueData = { name: data.name, email: data.email, organizationId: data.organizationId };

		// checking if the user already exists or not:
		const userExists = await User.findOne(userUniqueData);

		// if the user doesn't exist:
		if (!userExists) {
			// if user data doesn't exists, we will save the user data:
			const user = new User(data);

			// saving the data into db (db operations are always in async-await):
			await user.save();
		} else {
			// if user data exists, we will send this response:
			return res.status(409).send({            // 409 status code for data confliction
				message: 'User data insertion failed',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({                    // 201 status code for data received properly
			data: {
				Name: data.name,
				Email: data.email,
				OrganizationId: data.organizationId,
			},
			message: 'User data inserted successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to get all users:
const getAllUsers = async (req, res, next) => {
	try {
		// getting all the users from the users collection or table:
		const allUsers = await User.find();

		// if no users table or collection is empty:
		if (!allUsers) {
			return res.status(404).send({
				message: 'No user data found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: allUsers,
			message: 'All user data fetched successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to get user by id:
const getUserById = async (req, res, next) => {
	try {
		// getting user id from the request parameters:
		const userId = req.params.id;

		// getting user data based on id from users collection or table:
		const userById = await User.findById(userId);

		// if the user by id not found:
		if (!userById) {
			return res.status(404).send({
				message: 'User by this id not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: userById,
			message: 'User by id found successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to update user by id:
const updateUserById = async (req, res, next) => {
	try {
		// getting user id from request parameters:
		const userById = req.params.id;

		// getting update data from user's request body:
		const updatedUserData = req.body;

		// finding the user's data from the users collection or table and updating it:
		const updatedUser = await User.findByIdAndUpdate(
			userById,
			updatedUserData,
			{ new: true, runValidators: true }
		);

		// if the user is not found by id and updated:
		if (!updatedUser) {
			return res.status(404).send({
				message: 'User by this id not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedUser,
			message: 'User by id found and updated',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to delete user by id:
const deleteUserById = async (req, res, next) => {
	try {
		// getting user id from the request parameters:
		const userId = req.params.id;

		// getting user data from the users collection or table by id and deleting it:
		const deletedUser = await User.findByIdAndDelete(userId);

		// if user is not found by id and deleted:
		if (!deletedUser) {
			return res.status(404).send({
				message: 'User by this id not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deletedUser,
			message: 'User by id found and deleted',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// exporting all the controller functions:
export {
	addUser,
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById,
}
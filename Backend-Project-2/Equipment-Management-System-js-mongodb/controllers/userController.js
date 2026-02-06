// Internal Packages/Modules:
import User from '../models/userModel.js';

// controller function for creating user:
const addUser = async (req, res, next) => {
	try {
		// getting data from `req.validatedData` without any need for imports:
		const data = req.validatedData;

		// checking if the user exists:
		const userExists = await User.findOne({ email: data.email });

		// if user doesn't exist, we will create the user:
		if (!userExists) {
			// creating a new data in the database:
			const user = new User(data);

			// saving data in mongodb (db operations always need to be in async await):
			await user.save();
		} else {
			return res.status(409).send({   // Response code '409': Indicates conflict error with the data sent to the server.
				message: 'User already exists',
				success: false,
			});
		}

		// sending response:
		res.status(201).send({   // Response code '201': Indicates success message if upon data is received successfully.
			data: {
				userName: data.name,
				email: data.email,
				role: data.role,
			},
			message: 'User added successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function for getting data of all users:
const getAllUsers = async (req, res, next) => {
	try {
		// getting all the users from the collection or table:
		const allUsers = await User.find();

		// if no data exists:
		if (!allUsers) {
			return res.status(404).send({   // Response code '404': Data not found
				message: 'No data found for users',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({   // Response code '200': OK response.
			data: allUsers,
			message: 'All users fetched successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to get data of a user by id:
const getUserById = async (req, res, next) => {
	try {
		// getting user id from the parameters:
		const userId = req.params.id;

		// getting user data from the collection or table:
		const userById = await User.findById(userId);

		// if no user exists:
		if (!userById) {
			return res.status(404).send({
				message: `User by this id doesn't exist`,
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: userById,
			message: `User by id found`,
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to update data of a user by id:
const updateUserById = async (req, res, next) => {
	try {
		// getting user id from the parameters:
		const userId = req.params.id;

		// getting updated data from the user:
		const updatedData = req.validatedData;

		// getting data from the users collection or table based on id and updating it:
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			updatedData,
			{ new: true, runValidators: true },
		);

		// if user is not found and updated:
		if (!updatedUser) {
			return res.status(404).send({
				message: 'User not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedUser,
			message: 'User updated successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Controller function to delete data of a user by id:
const deleteUserById = async (req, res, next) => {
	try {
		// getting user id from the parameters:
		const userId = req.params.id;

		// getting data from the users collection or table based on id and deleting it:
		const deletedUser = await User.findByIdAndDelete(userId);

		// if data is not found and deleted:
		if (!deletedUser) {
			return res.status(404).send({
				message: 'User not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: deletedUser,
			message: 'User deleted successfully',
			success: true,
		});
	} catch (error) {
		next(error);
	}
}

// Exporting all the controller functions:
export {
	addUser,
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById,
};
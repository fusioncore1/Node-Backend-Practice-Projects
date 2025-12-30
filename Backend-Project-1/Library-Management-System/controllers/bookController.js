// importing internal modules:
import Book from '../models/bookModel.js';

// controller function to add books:
const addBook = async (req, res, next) => {
	try {
		// getting data from `req.validatedData` without any need for imports
		// const {
		// 	bookName,
		// 	authorName,
		// 	edition,
		// 	noOfPages,
		// 	totalCopies,
		// 	availableCopies,
		// } = req.validatedData;   // this might be too long for you
		const data = req.validatedData;

		const bookName = data.bookName;
		const authorName = data.authorName;
		const edition = data.edition;

		// checking if the book exists:
		const bookExists = await Book.findOne({ bookName, authorName, edition });

		// if book doesn't exist, we will add the data:
		if (!bookExists) {
			// creating a new data in mongoose:
			const book = new Book(data);

			// saving data in mongodb:
			await book.save();
		}
		else {
			// book already exists (409 means data is conflicting):
			return res.status(409).send({
				message: 'Book already exists',
				success: false,
			});
		}

		// sending response (201 means data received):
		res.status(201).send({
			data: {
				bookName: data.bookName,
				authorName: data.authorName,
				edition: data.edition,
			},
			message: 'Book added successfully',
			success: true,
		});
	}
	catch (error) {
		next(error);
	}
}

// controller function to get all books data:
const getAllBooks = async (req, res, next) => {
	try {
		// getting all data from books collection or table:
		const allBooks = await Book.find();

		// sending response:
		res.status(200).send({
			data: allBooks,
			message: 'All books fetched successfully',
			success: true,
		});
	}
	catch (error) {
		next(error);
	}
}

// controller function to get book data by id:
const getBookById = async (req, res, next) => {
	try {
		// getting id from url params:
		const bookId = req.params.id;

		// getting data from books collection or table based on book id:
		const bookDataById = await Book.findById(bookId);

		// if we can't find a book by id:
		if (!bookDataById) {
			return res.status(404).send({
				message: 'Book not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: bookDataById,
			message: 'Book found',
			success: true,
		});
	}
	catch (error) {
		next(error);
	}
}

// controller function to update book by id:
const updateBookById = async (req, res, next) => {
	try {
		// getting id from url params:
		const bookId = req.params.id;

		// getting update data from user:
		const updatedData = req.validatedData;

		// getting data from books collection or table based on book id and updating it:
		const updatedBook = await Book.findByIdAndUpdate(
			bookId,
			updatedData,
			{ new: true, runValidators: true });

		// if data is not found and updated:
		if (!updatedBook) {
			return res.status(404).send({
				message: 'Book not found',
				success: false,
			});
		}

		// sending response:
		res.status(200).send({
			data: updatedBook,
			message: 'Book updated successfully',
			success: true,
		});
	}
	catch (error) {
		next(error)
	}
}

// controller function to delete book by id:
const deleteBookById = async (req, res, next) => {
	try {
		// getting id from url params:
		const bookId = req.params.id;

		// getting data from books collection or table based on id and deleting it:
		const deletedBook = await Book.findByIdAndDelete(bookId);

		// if data is not found and deleted:
		if (!deletedBook) {
			return res.status(404).send({
				message: 'Book not found',
				success: false,
			});
		}

		res.status(200).send({
			data: deletedBook,
			message: 'Book data is deleted',
			success: true,
		});
	}
	catch (error) {
		next(error);
	}
}

// exporting all the controller functions:
export {
	addBook,
	getAllBooks,
	getBookById,
	updateBookById,
	deleteBookById,
};
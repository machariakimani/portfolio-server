const bcrypt = require("bcrypt")
const asyncHandler = require("express-async-handler")
const User = require("../models/User")

//get all users,, GET request,,access private
const getAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select("-password").lean()
	if (!users?.length) {
		return res.status(200).json([]) 
	}
	res.json(users)
})

//create new users
const addUser = asyncHandler(async (req, res) => {
	const { username, password } = req.body

	if (!username || !password ) {
		return res.status(400).json({ message: "All fields must be filled" })
	}	
// Check for duplicate email OR username
		const duplicate = await User.findOne({ username }).lean().exec();

			if (duplicate) {
			return res.status(409).json({
				message: `Username "${username}" is already taken`
			});
		}

	const hashedpwd = await bcrypt.hash(password, 10) //10 salt rounds
	const userObject = { username, "password": hashedpwd  }
	const user = await User.create(userObject)

	if (user) {
		res.status(201).json({ message: `User ${user.username} created successfully` })
	} else {
		res.status(400).json({ message: "Invalid user credentials entered" })
	}
})

const updateUser = asyncHandler(async (req, res) => {
	const { id } = req.params
	const { password, username, roles, email } = req.body

	
	if (!id || !username || !email) {
		return res.status(400).json({ message: "ID, username, and email are required" })
	}

	const user = await User.findById(id).exec()
	if (!user) {
		return res.status(400).json({ message: "User not found" })
	}

	// Check for duplicate email (exclude current user)
	const duplicate = await User.findOne({
			$or: [{ email }, { username }]
			}).lean().exec();

			if (duplicate && duplicate._id.toString() !== id) {
			return res.status(409).json({
				message: duplicate.email === email
				? `Email "${email}" is already registered`
				: `Username "${username}" is already taken`
			});
			}

	user.username = username
	user.email = email
	
	if (roles) {
		user.roles = Array.isArray(roles) ? roles : [roles]
	}

	if (password && password.trim()) {
		user.password = await bcrypt.hash(password, 10)
	}

	const updatedUser = await user.save()

	res.json({ message: `${updatedUser.username} updated successfully` })
})

const deleteUser = asyncHandler(async (req, res) => {
	const { id } = req.params

	if (!id) {
		return res.status(400).json({ message: "User ID is required" })
	}

	// Find the user
	const user = await User.findById(id).exec()
	if (!user) {
		return res.status(404).json({ message: "User not found" })
	}

	// Store username before deletion
	const username = user.username
	const userId = user._id

	await user.deleteOne()

	const reply = `${username}  deleted successfully`
	res.json({ message: reply })
})

module.exports = {
	getAllUsers,
	addUser,
	updateUser,
	deleteUser
}
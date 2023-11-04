import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//@description login User & get token
// route POST /api/users/login
// Access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    
    generateToken(res, user._id)
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@description Register User / Login
// route POST /api/users
// Access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    })
  } else{
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@description Logout User
// route POST /api/users/logout
// Access private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged Out Successfylly..." });
});

//@description Get User Profile
// route GET /api/users/profile
// Access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user= await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@description Update User Profile
// route PUT /api/users/profile
// Access private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@description Get Users
// route GET /api/users
// Access private/admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("Get User");
});

//@description Get User By Id
// route GET /api/user/:id
// Access private/admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("Get User By Id");
});

//@description Delete Users
// route DELETE /api/users/:id
// Access private/admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete User");
});

//@description Update User
// route PUT /api/users/:id
// Access private/admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update User");
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};

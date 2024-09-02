const userAccount_model = require("../models/userAccountModel");
const bcrypt = require("bcrypt");

// @Request   GET
// @Route     /api/useraccount
// @Desc      Get all user accounts
const getUserAccount = async (req, res) => {
  try {
    const userAccounts = await userAccount_model.find();

    // Check if no user accounts are found
    if (userAccounts.length === 0) {
      return res.status(404).json({ err: "No user accounts found" });
    }

    res.status(200).json(userAccounts);
  } catch (err) {
    console.log("Error fetching user accounts:", err);
    res.status(500).json({ err: "Server Error" });
  }
};

// Controller function to get a single user account by ID

const getSingleUserAccount = async (req, res) => {
  try {
    // Get the id from the params
    const _id = req.params.id;

    const userAccount = await userAccount_model.findOne({ _id });

    // Check if the user account is found
    if (!userAccount) {
      return res.status(404).json({ err: "User account not found" });
    }

    res.status(200).json(userAccount);
  } catch (err) {
    console.log("Error fetching single user account:", err);
    res.status(500).json({err:"Internal server error"});
  }
};


// @Request   POST
// @Route     /api/useraccount
// @Desc      Create a new user account
const createUserAccount = async (req, res) => {
  try {
    // Destructure the request body
    const { username, useremail, userpassword, userrole } = req.body;

    // console.log("req.file contains", req.file);
    // console.log("req.file contains buffer", req.file.buffer);

    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Ensures that the email address is in a valid format.
    const nameRegex = /^[A-Za-z\s]+$/; // Ensures that the name contains only letters and spaces, disallowing numbers and special characters.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Ensures password is at least 8 characters long, includes uppercase, lowercase, number, and special character.

    // Validation checks
    if (!nameRegex.test(username)) {
      return res.status(400).json({ err: "Invalid username. Only letters and spaces are allowed." });
    }
    if (!emailRegex.test(useremail)) {
      return res.status(400).json({ err: "Invalid email address." });
    }
    if (!passwordRegex.test(userpassword)) {
      return res.status(400).json({
        err: "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
      });
    }
    if (!req.file) {
      return res.status(400).json({ err: "Please select a profile picture" });
    }

    // Check if the user already exists
    const CheckUserExistance = await userAccount_model.findOne({ useremail });
    if (CheckUserExistance) {
      return res.status(400).json({ err: "Email already exists!" });
    }

    // Hashing the password using bcrypt
    const saltRound = await bcrypt.genSalt(10);
    const hash_Password = await bcrypt.hash(userpassword, saltRound);

    // Creating the user using disk storage
    const createUser = await userAccount_model.create({
      username,
      useremail,
      userpassword: hash_Password,
      userrole,
      userimage: req.file.filename, // Adjust based on your storage method
    });

    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    console.error("Error creating user account:", err);
    res.status(500).json({ err: "User registration failed", error: err.message });
  }
};


// @Request   PUT
// @Route     /api/useraccount/:id
// @Desc      Create a new user account

const updateUserAccount = async (req, res) => {
  try {
    const { username, useremail, userpassword } = req.body;
    const id = req.params.id;

    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validation checks
    if (!nameRegex.test(username)) {
      return res.status(400).json({ err: "Invalid username. Only letters and spaces are allowed." });
    }
    if (!emailRegex.test(useremail)) {
      return res.status(400).json({ err: "Invalid email address." });
    }

    // Find the existing user
    const existingUser = await userAccount_model.findById(id);
    if (!existingUser) {
      return res.status(404).json({ err: "User not found." });
    }

    // Prepare update data
    const updateData = {
      username,
      useremail,
    };

    // Conditionally validate and update password
    if (userpassword && userpassword !== existingUser.userpassword) {
      if (!passwordRegex.test(userpassword)) {
        return res.status(400).json({
          err: "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.",
        });
      }
      const saltRound = await bcrypt.genSalt(10);
      updateData.userpassword = await bcrypt.hash(userpassword, saltRound);
    }

    // Conditionally update image
    updateData.userimage = req.file ? req.file.filename : existingUser.userimage;

    // Update the user
    const updatedUser = await userAccount_model.findByIdAndUpdate(id, updateData, { new: true });

    res.status(201).json({ msg: "User updated successfully", updatedUser });
  } catch (err) {
    console.error("Error updating user account:", err);
    res.status(500).json({ err: "User update failed", error: err.message });
  }
};


// @Request   POST
// @Route     http://localhost:5000/api/useraccount/:id
// @Desc      delete a user account
const deleteUserAccount = async (req, res) => {
    try {
      // Get the ID from the request parameters
      const id = req.params.id;
  
      // Find the user by ID and delete it
      const deletedUserAccount = await userAccount_model.findByIdAndDelete(id);
  
      // Check if the user account was found and deleted
      if (!deletedUserAccount) {
        return res.status(404).json({ error: "User account not found" });
      }
  
      // Respond with a success message
      res.status(200).json({ msg: "User account deleted successfully", deletedUserAccount });
    } catch (error) {
      console.error("Error deleting user account:", error);
      res.status(500).json({error:"Internal server error"});
    }
  };

module.exports = {
  getSingleUserAccount,
  getUserAccount,
  createUserAccount,
  updateUserAccount,
  deleteUserAccount,
};

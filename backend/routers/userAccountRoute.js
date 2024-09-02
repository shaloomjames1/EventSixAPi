const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config")
const {
    getSingleUserAccount, 
    getUserAccount,       
    createUserAccount,
    updateUserAccount,
    deleteUserAccount
} = require("../controllers/userAccountController")


// Route to get all user accounts and create a new user account
router.route("/").get(getUserAccount).post(upload.single("userimage"),createUserAccount);                         
                        



// Route to get, update, and delete a single user account by ID
router.route("/:id").get(getSingleUserAccount).put(upload.single("userimage"),updateUserAccount).delete(deleteUserAccount);

module.exports = router;
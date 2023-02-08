const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validate = require('../middleware/validate.joi');
const validateEmployee = require('../validators/validation');

router.post("/register", validate(validateEmployee), userController.createEmployee);
router.get("/employees", userController.getAllEmployees);

module.exports = router;
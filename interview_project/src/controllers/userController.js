const UserModels = require('../models/user');
const validateEmployee = require('../validators/validation');
const winston = require('winston');
const bcrypt = require("bcrypt");
const saltRounds = 10;

// registering employee
exports.createEmployee = async (req, res) => {
  const { error } = validateEmployee(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  const employee = new UserModels({
    name: req.body.name,
    email: req.body.email,
    hobbies: req.body.hobbies,
    gender: req.body.gender,
    password: hashedPassword
  });
  
  console.log(employee)
  employee.save((err, employee) => {
    if (err) {
  
      return res.status(400).json({
        error: err.message
      });
    }
  });
  res.redirect('/employees');
};




// Get all employees details 
exports.getAllEmployees = (req, res) => {
  const perPage = 10;
  const page = req.query.page || 1;

  UserModels.find({}, '-password')
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err, employees) => {
      if (err) {
        return res.status(400).json({
          error: err.message
        });
      }
      UserModels.countDocuments().exec((err, count) => {
        if (err) {
          return res.status(400).json({
            error: err.message
          });
        }
        res.status(200).render('table', {
          users: employees,
          current: page,
          pages: Math.ceil(count / perPage)
        });
      });
    });
};

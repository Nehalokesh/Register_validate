const Joi = require('@hapi/joi');

const validateEmployee = (employee) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
    hobbies: Joi.array().required(),
    gender: Joi.string().required(),
    date: Joi.date().default(Date.now())
  });

  return schema.validate(employee, { abortEarly: false });
};

module.exports = validateEmployee;
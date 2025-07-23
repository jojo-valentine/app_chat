const Joi = require("joi");
const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$"
      )
    )
    .message(
      "Password must contain uppercase, lowercase, number, and special character"
    )
    .required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(6)
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$"
      )
    )
    .message(
      "Password must contain uppercase, lowercase, number, and special character"
    )
    .required(),
});
const validateLoginUser = (data) => {
  const { error, value } = loginUserSchema.validate(data, {
    abortEarly: false, // Capture all validation errors if true find error return error to find input error
  });
  if (error) {
    // console.error(
    //   "Validation failed:",
    //   error.details.map((detail) => detail.message)
    // );
    const errorMessages = error.details.map((detail) => ({
      field: detail.context.key, // Extract field name
      message: detail.message, // Extract error message
    }));

    return { isValid: false, errors: errorMessages };
    // throw new AppError(
    //   `Validation Error: ${error.details.map((e) => e.message).join(", ")}`,
    //   400
    // );
  }
  return { isValid: true, value };
};
module.exports = { createUserSchema, validateLoginUser };

const Joi = require('joi');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');

const validate = (schema, type) => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(object);

  const typeResponsed = {
    api: 'api',
    views: 'views'
  }

  if (error && typeResponsed[type] === 'api') {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  if (error && typeResponsed[type] === 'views') {
    return error.details.map((details) => details.message);
  }

  if (!error && typeResponsed[type] === 'views') {
    return;
  }

  Object.assign(req, value);
  return next();
};

module.exports = validate;

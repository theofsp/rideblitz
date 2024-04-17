const Joi = require('joi');
const schema = Joi.object({
  // client: Joi.alternatives().try(Joi.string(), Joi.object()).required(),
  // // number: Joi.number().required(),
  // rider: Joi.string().required(),
  // orderNumber: Joi.string().required(),
  // year: Joi.number().required(),
  // status: Joi.string().required(),
  // notes: Joi.string().allow(''),
  // // expiredDate: Joi.date().required(),
  // date: Joi.date().required(),



  client: Joi.alternatives().try(Joi.string(), Joi.object()),
  rider: Joi.string(),
  orderNumber: Joi.string(),
  status: Joi.string(),
  // notes: Joi.string().allow(''),
  // expiredDate: Joi.date(),
  date: Joi.date(),
});

module.exports = schema;

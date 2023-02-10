import Joi from "joi";
const donarSchema = Joi.object({
    fullName: Joi.string().required(),
    phoneNo: Joi.string().required(),
    donationType: Joi.string().required(),
    bloodType: Joi.string(),
    state: Joi.string().required(),
    city: Joi.string().required()
});

export default donarSchema;

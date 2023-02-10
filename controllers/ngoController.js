import mongoose from "mongoose";
import { Ngo } from "../models";
import Joi from "joi";
const ngoController = {
    async searchNgo(req, res, next){

         
        let result;
        try{
            const ngoSchema = Joi.object({
                state: Joi.string().required(),
                city: Joi.string().required()
            });
    
            const {error} = await ngoSchema.validateAsync(req.body)
    
            if(error){
                return next(error)
            }


            const {state, city} = req.body;
            try{

                result = await Ngo.find({state: state.toLowerCase(), city: city.toLowerCase()});
            }catch(err){
                return next(err)
            }

        }catch(error){
            return next(error);
        }

        return res.status(200).json(result);

    }
}

export default ngoController;
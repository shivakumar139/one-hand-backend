import { Donar } from "../models";
import Joi from "joi";



const DonarController = {
    async addDonar(req, res, next){
        let id;

        

        try{

            const donarSchema = Joi.object({
                fullName: Joi.string().required(),
                phoneNo: Joi.string().required(),
                donationType: Joi.string().required(),
                bloodType: Joi.string().min(0),
                state: Joi.string().required(),
                city: Joi.string().required()
            });
    
            const {error} = await donarSchema.validateAsync(req.body)
    
            if(error){
                return next(error)
            }
            const {fullName, phoneNo, donationType, bloodType, state, city} = req.body;

            const donar = new Donar({
                fullName,
                phoneNo,
                donationType,
                bloodType,
                state,
                city
            })

            try{
                const { _id } = await donar.save();  
                id = _id;    
            } catch(err){
                return next(err)
            }
            


            // if(req.body.donationType === "blood" || req.body.donationType === "Blood"){

            //     try{

            //         const donarSchema = Joi.object({
            //             fullName: Joi.string().required(),
            //             phoneNo: Joi.string().required(),
            //             donationType: Joi.string().required(),
            //             bloodType: Joi.string().required(),
            //             state: Joi.string().required(),
            //             city: Joi.string().required()
            //         });

            //         const {error} = await donarSchema.validateAsync(req.body)

            //         if(error){
            //             return next(error)
            //         }

            //         const {fullName, phoneNo, donationType, bloodType, state, city} = req.body;

            //         const donar = new Donar({
            //             fullName,
            //             phoneNo,
            //             donationType,
            //             bloodType,
            //             state,
            //             city
            //         })

            //         try{
            //             const { _id } = await donar.save();  
            //             id = _id;    
            //         } catch(err){
            //             return next(err)
            //         }

            //     } catch(err){
            //         return next(err)
            //     }
                
            // } else{
            //     const donarSchema = Joi.object({
            //             fullName: Joi.string().required(),
            //             phoneNo: Joi.string().required(),
            //             donationType: Joi.string().required(),
            //             state: Joi.string().required(),
            //             city: Joi.string().required()
            //         });

            //         const {error} = await donarSchema.validateAsync(req.body)

            //         if(error){
            //             return next(error)
            //         }

            //         const {fullName, phoneNo, donationType, state, city} = req.body;



            //         const donar = new Donar({
            //             fullName,
            //             phoneNo,
            //             donationType,
            //             state,
            //             city,
            //         })

            //         try{
            //             const { _id } = await donar.save();  
            //             id = _id;

            //         } catch(err){
            //             return next(err)
            //         }
            // }

        } catch(err){
            return next(err)
        }

        return res.status(201).json({success: true, id});
    },

    async searchDonars(req, res, next){
        let result;
        try{

            const donarSchema = Joi.object({
                donationType: Joi.string().required(),
                bloodType: Joi.string(),
                state: Joi.string().required(),
                city: Joi.string().required()
            });

            const {error} = await donarSchema.validateAsync(req.body)

            console.log(req.body)
            if(error){
                return next(error)
            }

            if(req.body.donationType === "blood" || req.body.donationType === "Blood"){

                const donarSchema = Joi.object({
                    donationType: Joi.string().required(),
                    bloodType: Joi.string().required(),
                    state: Joi.string().required(),
                    city: Joi.string().required()
                });

                const {error} = await donarSchema.validateAsync(req.body)

                if(error){
                    return next(error)
                }
                const {bloodType, city} = req.body;

                try{
                    result = await Donar.find({bloodType: bloodType, city: city.toLowerCase()});

                }catch(err){
                    return next(err)
                }
                
            } else{

                const donarSchema = Joi.object({
                    donationType: Joi.string().required(),
                    state: Joi.string().required(),
                    city: Joi.string().required()
                });

                const {error} = await donarSchema.validateAsync(req.body)

                if(error){
                    return next(error)
                }

                const {city, donationType} = req.body;
                try{
                    result = await Donar.find({donationType: donationType.toLowerCase(), city: city.toLowerCase()});
                    
                }catch(err){
                    return next(err)
                }
                
                
            }
            
        } catch(err){
            return next(err)
        }


        return res.status(200).json(result);
    }

    
}

export default DonarController;
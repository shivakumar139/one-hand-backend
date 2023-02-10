import multer from "multer";
import path from "path";
import { Donar } from "../models";
import CustomErrorHandler from "../services/CustomErrorHandler"
import Joi from "joi";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage }).single("image");


const DonarController = {
    async addDonar(req, res, next){
        let id;

        

        try{

            // const donarSchema = Joi.object({
            //     fullName: Joi.string().required(),
            //     phoneNo: Joi.string().required(),
            //     donationType: Joi.string().required(),
            //     bloodType: Joi.string(),
            //     state: Joi.string().required(),
            //     city: Joi.string().required()
            // });
    
            // const {error} = await donarSchema.validateAsync(req.body)
    
            // if(error){
            //     return next(error)
            // }

            if(req.body.donationType === "blood" || req.body.donationType === "Blood"){

                try{

                    const donarSchema = Joi.object({
                        fullName: Joi.string().required(),
                        phoneNo: Joi.string().required(),
                        donationType: Joi.string().required(),
                        bloodType: Joi.string().required(),
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

                } catch(err){
                    return next(err)
                }
                
            } else{
                
                
                upload(req, res, async (err) =>{
                    
                    if(err){
                        return next();
                    }
                   
        
                    if(!req.file){
                        return next(CustomErrorHandler.imageIsMissing())
                    }

                    const filePath = req.file.path;
                    const donarSchema = Joi.object({
                        fullName: Joi.string().required(),
                        phoneNo: Joi.string().required(),
                        donationType: Joi.string().required(),
                        state: Joi.string().required(),
                        city: Joi.string().required()
                    });

                    const {error} = await donarSchema.validateAsync(req.body)

                    if(error){
                        return next(error)
                    }

                    const {fullName, phoneNo, donationType, state, city} = req.body;



                    const donar = new Donar({
                        fullName,
                        phoneNo,
                        donationType,
                        state,
                        city,
                        image: filePath
                    })

                    try{
                        const { _id } = await donar.save();  
                        id = _id;

                    } catch(err){
                        return next(err)
                    }
             
                });
            }

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
                    bloodType: Joi.string(),
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
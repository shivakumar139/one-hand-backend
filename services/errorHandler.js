
import {DEBUG_MODE} from "../config";
import { ValidationError } from "joi";
import CustomErrorHandler from "./CustomErrorHandler";

const errorHandler = (error, req, res, next) => {

        let statusCode = 500;
        let data = {
            message: "Internal server error",
            ...(DEBUG_MODE === "true" && {originalError: error.message})
        }

        if(error instanceof ValidationError){
            statusCode = 422;
            data = {
                message: error.message
            };
        }

        if(error instanceof CustomErrorHandler){
            statusCode = error.statusCode;
            data = {
                message: error.message
            };
        }

        
        return res.status(statusCode).send(data);
}

export default errorHandler;
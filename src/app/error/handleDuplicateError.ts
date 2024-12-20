

import mongoose from "mongoose";
import { TErrorSources, TGenericResponse } from "../interface/error";


const handleDuplicateError = (err: any): TGenericResponse => {

    // Extract value  within double quote using regex
    const match = err.message.match(/"([^"]*)"/);

    // The extracted value will be in the first capturing group 
    const extractedMessage = match && match[1];
    const errorSources: TErrorSources = [
        {
            path: '',
            message: `${extractedMessage} is already exists ! `,
        }
    ]

    const statusCode = 400;

    return {
        statusCode,
        message: 'Invalid ID',
        errorSources,
    };
};

export default handleDuplicateError

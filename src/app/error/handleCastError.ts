import mongoose from 'mongoose';
import { TErrorSources, TGenericResponse } from '../interface/error';

const handleCastError = (err: mongoose.Error.CastError): TGenericResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    // message: 'Validation Error',
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleCastError;

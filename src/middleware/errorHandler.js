import mongoose from "mongoose";

export const notFound = (err,req,res,next) => {
    const error = new Error(`Route nuk u gjet: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

export const errorHandler = (err,req,res,next) => {
    let statusCode = err.statusCode || res.statusCode || 500;
    let message = err.message || 'Gabim ne server';
    let errors;

    if(err instanceof mongoose.Error.ValidationError){
        statusCode = 400;
        message = 'Te dhenat nuk jane valide';
        errors = Object.values(err.errors).map((error) => error.message);
    }
    if(err instanceof mongoose.Error.CastError){
        statusCode = 400;
        message = 'ID nuk eshte valide';
    
    }
    if(err.code === 11000){
        statusCode = 400;
        message = 'Ky rekord ekziston tani';
    }
    res.status(statusCode).json({
        success:false,
        message,
        ...(errors ? { errors} : {})
    });
};

import {
  INTERNAL_SERVER_ERROR,
  CAST_ERROR,
  JSON_WEB_TOKEN_ERROR,
  TOKEN_EXPIRED_ERROR
} from '../constants.js';

export default class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || INTERNAL_SERVER_ERROR;

  if(err.name === CAST_ERROR) {
    const message = `Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  } else if (err.name === JSON_WEB_TOKEN_ERROR) {
    const message = `JWT is invalid, Try again`;
    err = new ErrorHandler(message, 400);
  } else if (err.name === TOKEN_EXPIRED_ERROR) {
    const message = `JWT is expired, Try again`;
    err = new ErrorHandler(message, 400);
  }
  
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  } 

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};


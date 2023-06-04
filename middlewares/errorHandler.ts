import { NextFunction, Request, Response } from 'express';
export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.log('error', error);
  const status = error.statusCode || 500;
  const message = error.message || 'Ocurrio un error en el servidor';
  res.status(status).json( { success: false, error: message } );
}

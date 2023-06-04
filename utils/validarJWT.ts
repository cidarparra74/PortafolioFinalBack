import { request, response } from "express";
import jwt from 'jsonwebtoken';

const validarJWT = (req = request, res = response, next: () => void) => {

  const token = req.header('x-token');

  if(!token){
    return res.status(401).json({
      msg: 'No hay token'
    })
  }

  try {
    const resultToken: any = jwt.verify( token, process.env.SECRETKEY || '' );

    req.body.uid = resultToken?.uid;
    console.log('resultToken', resultToken);

    next();
  } catch (error) {
    return res.status(401).json({
      msg: 'Token no válido'
    })
  }
};

export default validarJWT;
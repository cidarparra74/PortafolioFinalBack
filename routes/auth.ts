
import { Router } from "express";
import { login, logout, validateToken } from "../controllers/authController";
import validarJWT from '../utils/validarJWT';

const router = Router();

router.post('/login', login);
router.post('/logout', validarJWT, logout);
router.post('/validate-token', validarJWT, validateToken);

export default router;

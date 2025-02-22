import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, AuthUser } from '../types/authTypes';

export const validarAutenticacion = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ mensaje: 'Acceso no autorizado' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as AuthUser;
        req.user = decoded;  // Ahora TypeScript reconoce `req.user` correctamente
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token inválido' });
    }
};

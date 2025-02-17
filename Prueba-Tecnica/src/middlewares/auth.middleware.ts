import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extender Request correctamente
interface AuthRequest extends Request {
    user?: { id: number; email: string; role: string };
}

export const validarAutenticacion = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ mensaje: 'Acceso no autorizado' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number; email: string; role: string };
        (req as AuthRequest).user = decoded;  // Hacemos un casteo de `req` para que TypeScript lo reconozca
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token inválido' });
    }
};

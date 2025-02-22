import { Request } from 'express'

export interface AuthUser {
	id: number
	email: string
	role: 'admin' | 'trabajador'
}

export interface AuthRequest extends Request {
	user?: AuthUser
}



import { Schema, model, connect } from 'mongoose';
import { USER_ROLE } from './user.constant';


// export interface User {
export interface TUser {
    id: string;
    name: string;
    email:string;
    password: string;
    needsPasswordChange: boolean;
    passwordChangedAt?: Date;
    role: 'admin' | 'user';
    status?: 'active' | 'blocked';
    isBlocked: boolean;
    isDeleted: boolean;
    // createdAt: Date; 
    // updatedAt: Date;   
}

export type TUserRole = keyof typeof USER_ROLE;

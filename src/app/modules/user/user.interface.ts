

import { Schema, model, connect } from 'mongoose';


// export type Student = {
//   id: string;
//   name: UserName,
//   gender: "male"|"female";
//   dateOfBirth?: string;
//   email: string;
//   avatar?: string;
//   contactNo: string;
//   emergencyContactNo: string;
//   bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
//   presentAddress: string;
//   permanentAddress: string;
//   guardian: Guardian;
//   localGuardian: LocalGuardian;
//   profileImg?: string;
//   isActive: 'active' | 'blocked';
// }


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

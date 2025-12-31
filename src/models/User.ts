import { Schema, model,models,Types } from 'mongoose';
import bcrypt from 'bcryptjs';
 

// 1. Create an interface representing a document in MongoDB.
export interface IUser{
    id?:Types.ObjectId;
    name:string;
    email:string;
    picture:string;
    password:string;
    refreshToken:string;
    createdAt?:Date;
    updatedAt?:Date;
}


// 2. Create a Schema corresponding to the document interface.
const userSchema=new Schema<IUser>({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    picture:{type:String,default:""},
    refreshToken:{type:String,default:""}
},{
    timestamps:true
})

userSchema.pre("save",async function (next) {
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
    // next();
    
})

// 3. Create a Model.
const userModel=models.User || model<IUser>("User",userSchema);
export default userModel;
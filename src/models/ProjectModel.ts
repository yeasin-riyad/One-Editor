import mongoose from "mongoose";

export interface IProject{
    id?: mongoose.Types.ObjectId;
    name:string;
    userId:mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?:Date;
}

const projectSchema= new mongoose.Schema<IProject>({
    name:{
        type:String,
        required:true,
        unique:true
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    }
},{
    timestamps:true
})

export const ProjectModel= mongoose.models.Project || mongoose.model<IProject>("Project",projectSchema)
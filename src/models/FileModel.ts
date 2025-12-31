import mongoose from "mongoose";

export interface IFile{
    id?:mongoose.Types.ObjectId;
    name:string;
    extension?:string;
    content?:string;
    projectId:mongoose.Types.ObjectId;
    createdAt?:Date;
    updatedAt?:Date;
}

const fileSchema= new mongoose.Schema<IFile>({
    name:{
        type:String,
        required:true,
    },
    extension:{
        type:String,
    },
    content:{
        type:String,
        default:""
    },
    projectId:{
        type:mongoose.Schema.ObjectId,
        ref:'Project'
    }
},{
    timestamps:true
})

fileSchema.pre('save',function(){
    if(this.isModified('name')){
        const extArray=this?.name?.toString()?.split(".");
        const extension=extArray[extArray.length-1];
        this.extension=extension;
    }
})

export const FileModel=mongoose.models.File || mongoose.model<IFile>('File',fileSchema)
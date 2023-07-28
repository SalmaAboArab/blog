import mongoose, { Schema,model,Types } from "mongoose";

const blogSchema=new Schema({
    blogTitel:{
        type:String,
        required:true
    },
    blogdescription:{
        type:String,
        required:true,
    },
    userId:{
        type:Types.ObjectId,
        ref:"User",            // اللي هيشاور عليه
        required: true
    }
},{
    timestamps:true
})


const blogModel=model('Blog',blogSchema);
export default blogModel;
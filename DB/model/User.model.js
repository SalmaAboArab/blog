import {Schema,model} from 'mongoose'

const userSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    age:Number
},{
    timestamps:true     //create at & update at  هتضيف
}
)

const usermodel=model("User",userSchema);
export default usermodel;
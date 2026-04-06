const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:{value:true, message:"Password is required"},
        select:false
    }
},{
    timestamps:true
});

userSchema.pre("save",async function(){
    this.password=await bcrypt.hash(this.password,10);
});

module.exports=mongoose.model("User",userSchema);
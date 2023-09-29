
const mongoose=require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const UserSchema= new mongoose.Schema({
        name:{
            type:String 
        },
        RollNo:{
            type:Number
        },
        email:{
            type:String,
            required:true,
            // unique:[true,"email id already present"],
            // validate(value){
            //     if(!validator.isEmail(value)){
            //         throw new Error("Invalid email");
            //     }
            // }
        },
        username:{
            type:String
        },
        password:{
            type:String
        },
        tokens:[{
            token:{
                type:String
            }
        }]
});


//generate token
UserSchema.methods.generateAuthToken = async function(){
    try{
        const token =jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(error){
        res.jsonp({
            message:"error during generating token",
            status:false,
            Error:error
        })
    }
}

//converting password to hash
UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
        //console.log(`the current password is ${this.password}`);
        this.password=await bcrypt.hash(this.password,10);
        //console.log(`the current password is ${this.password}`);
    }
    next();
})

const userModel =new mongoose.model("userModel",UserSchema);

module.exports=userModel;
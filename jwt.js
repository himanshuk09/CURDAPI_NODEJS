const jwt = require("jsonwebtoken");
const _id ="123456789";
const secretkey ="mynameishimanshupremkumarkhade";
const createToken = async ()=>{
    const token = await jwt.sign({_id},secretkey,{expiresIn:"600000 seconds"});
    console.log(token);

    const userVerify = await jwt.verify(token,secretkey);
    console.log(userVerify);
}
createToken();
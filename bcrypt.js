const bcrypt = require("bcryptjs");

const  securePassword=async(password)=>
{
    const passwordhash = await bcrypt.hash(password,10);
    console.log(passwordhash);
    const comparePassword = await bcrypt.compare(password,passwordhash);
    console.log(comparePassword);
}
securePassword("helloWorld");
const userModel = require("../models/models");
const bcrypt=require("bcryptjs");
exports.addUser = async (req, res) => {
    const {username , password } = userModel(req.body);
    
    const user = new userModel(req.body);
    // here middleware call form models.js
    user.save()
        .then((resData) => {
            res.jsonp({
                message: "User added Successfully ",
                status: true,
                result: resData,
            });
        })
        .catch((error) => {
            res.jsonp({
                message: "Unable to add user",
                status: false,
                result: error
            })
        })
}


exports.register = (req, res) => {
    userModel.findOne({ email: req.body.email })
        .then((userData) => {
            if (userData) {
                res.jsonp({ message: "user is already register" });
            } else {
                const {username , password } = userModel(req.body);
                // here middleware call form models.js
                const userData = new userModel(req.body);
                userData
                    .save()
                    .then((resData) => {
                        res.jsonp({
                            message: "User registered successfully",
                            status: true,
                            result: resData,
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        res.jsonp({ message: "Unable to register user", status: false });
                    });
            }
        })
        .catch((error) => {
            console.log("Unable to get User");
        });
};


exports.login = (req, res) => {
    const {username ,password} = userModel(req.body);
    console.log(`${username} and ${password}`)
    userModel.findOne({ username: req.body.username })
        .then((userData) => {
            if (userData) {
                //database ka data
                // console.log(userData.password);
                //postman se aaya vala data req.body 
                // console.log("Body ", req.body.password);
                // if (userData.password == req.body.password) {
                //     res.jsonp({ message: "user logged in successfully" });
                // } else {
                //     res.jsonp({ message: "Incorrect password" });
                // }
                bcrypt.compare(password,userData.password)
                .then((resData)=>{
                    res.jsonp({
                        message:"User Login Successfully ..",
                        status:true,
                        result:userData
                    })
                })
                .catch((err)=>{
                    res.jsonp({
                        message:"Invalid Password",
                        status:false,
                        Error:err
                    })
                })
            } else
                res.jsonp({ message: "You are not register with us please register" });
        })
        .catch((error) => {
            res.jsonp({ message: "Unable to find user" });
        });
};

exports.getUser = (req, res) => {
    userModel.find()
        .then((resData) => {
            res.jsonp({
                message: "User data Fatch successfully",
                status: true,
                result: resData
            })
        })
        .catch((error) => {
            res.jsonp({
                message: "Unable to fetch user",
                status: false,
                result: error
            })
        })
}



exports.getUserById = (req, res) => {
    userModel.findOne({ _id: req.params.id })
        .then((resData) => {
            res.jsonp({
                message: "User data Fatch successfully",
                status: true,
                result: resData
            })
        })
        .catch((error) => {
            res.jsonp({
                message: "Unable to fetch user",
                status: false,
                result: error
            })
        })
}


exports.updateUserById = (req, res) => {
    userModel.findOneAndUpdate({ _id: req.params.id }, req.body)
        .then((resData) => {
            res.jsonp({
                message: "User data Fatch successfully",
                status: true,
                result: resData
            })
        })
        .catch((error) => {
            res.jsonp({
                message: "Unable to fetch user",
                status: false,
                result: error
            })
        })
}


exports.deleteUserById = (req, res) => {
    userModel.findOneAndDelete({ _id: req.body.id })
        .then((resData) => {
            res.jsonp({
                message: "User delete successfully",
                status: true
            })
        })
        .catch((error) => {
            res.jsonp({
                message: "Unable to fetch user",
                status: false
            })
        })
}


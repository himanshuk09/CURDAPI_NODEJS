const userModel = require("../models/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
//simply add user without check into database but db check it itself
const add = async (req, res) => {
    try {
        const { username, password } = userModel(req.body);
        console.log(`${username} and ${password}`);
        const user = new userModel(req.body)
        // here middleware call form models.js
        const userData = await user.save();
        res.jsonp({
            Message: "user Added successfully ",
            status: true,
            result: userData
        })
    }
    catch (e) {
        res.jsonp({
            Message: "unable to add user ",
            status: false,
            result: e
        })
    }

}

const signUp = async (req, res) => {
    try {
        const { username, password, email } = userModel(req.body);
        const existingUser = await userModel.findOne({ email: req.body.email })
        if (existingUser) {
            return res.jsonp({
                Message: "Email already registered", status: false
            })
        }
        const newUser = new userModel(req.body);
        // here middleware call form models.js
        
        //jwt middleware
        const token = await newUser.generateAuthToken();
        const userData = await newUser.save();
        res.jsonp({
            Message: "user registered successfully", status: true, result: userData
        })
    }
    catch (err) {
        res.jsonp({
            Message: "Unable to register ", status: false, result: err
        })
    }
}

const signIn = async (req, res) => {
    try {
        const { username, password } = userModel(req.body);
        const existingUser = await userModel.findOne({ username: req.body.username })
        if (!existingUser) {
            return res.jsonp({
                Message: "User not found", status: false
            })
        }
        
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.jsonp({
                message: "Invalid Password",
                status: false
            })
        }
         //jwt middleware
        const token = await existingUser.generateAuthToken();
        res.jsonp({
            message: "User Login Successfully ..",
            status: true,
            result: existingUser
        })
    } catch (err) {
        res.jsonp({
            message: "Internal Server Error",
            status: false,
            result: err
        })
    }
}

const getAll = async (req, res) => {
    try {
        const resData = await userModel.find();
        res.jsonp({
            message: "User data Fatch successfully",
            status: true,
            result: resData
        })
    } catch (err) {
        res.jsonp({
            message: "Unable to fetch user",
            status: false,
            result: error
        })
    }
}

const getByid = async (req, res) => {
    try {
        const resData = await userModel.findOne({ _id: req.params.id });
        console.log(resData);
        res.jsonp({
            message: "User data Fatch successfully",
            status: true,
            result: resData
        })
    } catch (err) {
        res.jsonp({
            message: "Unable to fetch user",
            status: false,
            result: error
        })
    }
}


const updateByid = async (req, res) => {
    try {
        const resData = await userModel.findOneAndUpdate({ _id: req.body.id });
        res.jsonp({
            message: "User data Fatch successfully",
            status: true,
            result: resData
        })
    } catch (err) {
        res.jsonp({
            message: "Unable to fetch user",
            status: false,
            result: error
        })
    }
}

const deleteByid = async (req, res) => {
    try {
        const resData = await userModel.findOneAndDelete({ _id: req.body.id });
        res.jsonp({
            message: "User data Fatch successfully",
            status: true,
            result: resData
        })
    } catch (err) {
        res.jsonp({
            message: "Unable to fetch user",
            status: false,
            result: error
        })
    }
}


const AuthController = {
    add,
    signUp,
    signIn,
    getAll,
    getByid,
    updateByid,
    deleteByid
};

module.exports = AuthController;
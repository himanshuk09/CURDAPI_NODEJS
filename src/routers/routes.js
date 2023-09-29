const router = require("express").Router();
const userControllerAsync =require("../controller/controllerAsync")
const userController = require("../controller/controller");

//using async await
router.post("/add",userControllerAsync.add);
router.post("/signup",userControllerAsync.signUp);
router.post("/signin",userControllerAsync.signIn);
router.get("/getAll",userControllerAsync.getAll);
router.get("/getuser/:id",userControllerAsync.getByid);
router.put("updateuser/:id",userControllerAsync.updateByid);
router.patch("updateuser/:id",userControllerAsync.updateByid);
router.delete("/deleteuser/:id",userControllerAsync.deleteByid);

//without async await
router.post("/adduser",userController.addUser);
router.post("/register",userController.register);
router.post("/login",userController.login);
router.get("/get",userController.getUser);
router.get("/get/:id",userController.getUserById);
router.put("/update/:id",userController.updateUserById);
router.patch("/update/:id",userController.updateUserById);
router.delete("/delete/:id",userController.deleteUserById);

module.exports=router;
const express=require("express")
const router=express.Router()
const {addUser,userLogin,addNewRecipe,getRecipes}=require("../controllers/controller")



router.route("/register").post(addUser)
router.route("/login").post(userLogin)

router.route("/recipes").get(getRecipes).post(addNewRecipe)
module.exports=router;

const User=require("../models/User")
const Recipe=require("../models/Recipe")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const addUser=async(req,res)=>{
    
    try{
        res.header("Access-Control-Allow-Origin", "*")

        const {username,password}=req.body
        if(username==null || password==null)return res.status(400).json({msg:"Falta el username/password"})

        const user=await User.findOne({username})
        if(user)return res.status(500).json({msg:`Username : ${username} already exists in DB¡¡¡`})
        
        const passEncrypted=await bcrypt.hash(password,10)
        
        const register_user=await User.create({username,password:passEncrypted})
        if(!register_user) return res.status(500).json({msg:"Hubo un error la intentar crear el usuario"})
        return res.status(201).json({user:register_user})
        
    }catch(error){
        return res.status(500).json({msg:"Server Error...."})
    }   
}

const userLogin=async(req,res)=>{
    try{
        res.header("Access-Control-Allow-Origin", "*")
        const {username,password}=req.body 
        if(username==null || password==null)return res.status(400).json({msg:"Falta el username/password"})
        
        const user=await User.findOne({username})
        if(!user) return res.status(400).json({msg:`El usuario: ${username}, no existe en la DB`})
        
        const passIsValid=await bcrypt.compare(password,user.password)
        if(!passIsValid) return res.status(500),json({msg:"El password no es valido"})
        const token=jwt.sign({userID:user._id},"secret",{
            expiresIn:"1d"
        })
        return res.status(200).json({user:{token,userID:user._id}})
        
    
    }catch(error){
        return res.status(500).json({msg:"Server Error...."})

    }
}

const addNewRecipe=async(req,res)=>{
    try{
        console.log(req.body)
        if(!req.body)return res.status(400).json({msg:"No se econtro ninguna receta que agregar "})
        const recipe=await Recipe.create(req.body)
        if(!recipe)return res.status(400).json({msg:"Hubo un problema al crear la receta"})
        return res.status(200).json({recipe})

    }catch(error){
        return res.status(500).json({msg:"Server Error"})
    }
}

const getRecipes=async(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*")
    try{
        const recipes=await Recipe.find()
        if(!recipes)return res.status(400).json({msg:"La coleccion no existe o se encuentra vacia"})
        return res.status(200).json({recipes})
        
    }catch(error){
        return res.status(500).json({msg:"Server Error"})
    }
}


module.exports={
    addUser,
    userLogin,
    addNewRecipe,
    getRecipes
}
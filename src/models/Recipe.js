const mongoose=require("mongoose")

const recipeSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
        
    },
    ingredients:{
        type:String,
        required:true,
        trim:true
        
    },
    instructions:{
        type:Array,
        required:true,
        trim:true
        
    },
    cookingTime:{
        type:Number,
        required:true,
        trim:true
        
    },
    imgUrl:{
        type:String,
        required:true,
        trim:true
        
    },
    userOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
        trim:true,        
    },
})

module.exports=mongoose.model("recipe",recipeSchema)
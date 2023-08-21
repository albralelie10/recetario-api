const mongoose=require("mongoose")

const connectDB =async(uri)=>{
    return mongoose.connect(uri)
            .then(()=>console.log("Conect to DB....."))
                .catch(error=>console.log(error))
}

module.exports=connectDB;
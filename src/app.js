const express=require("express")
const app=express()
const PORT=3000 || process.env.PORT
require("dotenv").config()
const cors=require("cors")
const router=require("./routes/route")
const connectDB=require("./db/connection")


app.use(cors({
  origin: "https://simple-mern-recetario-frontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api/v1",router)

app.get("/",(req,res)=>{
    return res.send("Start Home Page")
})

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT,()=>console.log("Server running"))
        
    }catch(error){
        console.log(error)
    }
}

start();

module.exports=app;



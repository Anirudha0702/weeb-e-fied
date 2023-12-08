const express= require("express") 
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors(
    {
        origin: ['http://localhost:5173','https://weebefied.netlify.app','http://192.168.0.102:5173'],
        methods: ['GET','POST','PUT','DELETE'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    
    }
));


main().catch(err => console.log(err))
async function main(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log("DataBase is running!"))
    .catch(err => console.log(err))
}
app.use('/api/post',require('./routes/Post'))
app.use('/api/watch',require('./routes/Episode'))
app.use("/api/info",require("./routes/Episodes"))
app.use("/api/search",require("./routes/Search"))
app.use("/api/trendings",require("./routes/Trendings"))
app.get("/",(req,res)=>{
    console.log("API is running")
    res.json({ defaultRoute: 'Weeb-e-Fied API (new)' }); 
    
})
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
module.exports = app;
const express= require("express") 
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
dotenv.config();
const app = express();
app.use(express.json());
// app.use(cors(
//     {
//         origin: 'https://weeb-e-fied.netlify.app',
//         methods: ['GET','POST','PUT','DELETE'],
//     }
// ));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://weeb-e-fied.netlify.app");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })


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
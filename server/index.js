const express= require("express") 
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(cors({
    origin: "*",
    methods : ["GET"],
    credentials: true 
}))
app.use('/api/watch',require('./routes/Episode'))
app.use("/api/info",require("./routes/Episodes"))
app.use("/api/search",require("./routes/Search"))
app.use("/api/trendings",require("./routes/Trendings"))
app.get("/",(req,res)=>{
    console.log("API is running")
    res.json({ defaultRoute: 'Weeb-e-Fied API' });
})
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})
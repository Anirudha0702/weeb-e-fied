const express= require("express") 
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });
app.use(cors());
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
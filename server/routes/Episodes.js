const router=require('express').Router();
const axios=require('axios');
const e = require('express');
router.get("/:anime",async(req,res)=>{
    const {anime}=req.params; 
    const strikeURL=`${process.env.BASE_URI}anime/info/${anime}`;
        
            const { data } = await axios.get(strikeURL);

             res.status(data.statusCode).json(data)
})
module.exports=router;
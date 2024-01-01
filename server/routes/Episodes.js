const router=require('express').Router();
const axios=require('axios');
const e = require('express');
router.get("/:anime",async(req,res)=>{
    const {anime}=req.params; 
    const strikeURL=`${process.env.BASE_URL}/info/${anime}`;
        try {
            const { data } = await axios.get(strikeURL);
             res.status(200).json(data)
        } catch (err) {
            console.log(err.message)
            res.status(404).json({ error: "No  Episodes found" })
           
        }
})
module.exports=router;
const router=require('express').Router();
const axios=require('axios');
const e = require('express');
router.get('/:anime',async(req,res)=>{
    const anime=req.params.anime.toLowerCase();
    const strikeURL=`${process.env.BASE_URL}/${anime}`;
    try {
        const {data}=await axios.get(strikeURL);
        res.status(200).json(data.results);
    } catch (error) {
        return error
    }
    
})
module.exports=router;
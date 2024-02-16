const router=require('express').Router();
const axios=require('axios');
router.get('/:anime',async(req,res)=>{
    const anime=req.params.anime.toLowerCase();
    const strikeURL=`${process.env.BASE_URL}/${anime}`;
    try {
        const {data}=await axios.get(strikeURL);
        res.status(200).json(data.results);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    
})
module.exports=router;
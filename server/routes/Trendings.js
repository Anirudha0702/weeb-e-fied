const router=require('express').Router();
const axios=require('axios');
router.get('/',async(req,res)=>{
    const strikeURL=`${process.env.BASE_URL}/top-airing`;
    try {
        const {data}=await axios.get(strikeURL);
        res.status(200).json(data.results);
    } catch (error) {
        console.log(error)
        return error
    }
    
})
module.exports=router;
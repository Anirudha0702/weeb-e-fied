const router=require('express').Router();
const axios=require('axios');
const e = require('express');
router.get("/:anime/:episode",async(req,res)=>{
    const {anime,episode}=req.params; 
    const strikeURL=`${process.env.BASE_URL}/info/${anime}`;
        try {
            const { data } = await axios.get(strikeURL);

            const _res=await axios.get(`${process.env.BASE_URL}/watch/${data.episodes[episode-1].id}`,{ params: { server: "gogocdn" } })
            url=(_res.data.sources.find((source) => source.quality === "1080p").url)
            console.log(url)
             res.status(200).json(url)
        } catch (err) {
            console.log(err.message)
            res.status(404).json({ error: "Episode not found" })
           
        }
})
module.exports=router;
const router=require("express").Router();
const Post = require("../Models/Post");
router.post("/create",async(req,res)=>{
    console.log(req.body)
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
})
router.put("/like/:id",async(req,res)=>{
    try{
        const res_=await Post.find({likedBy:req.body.likedBy})
        console.log(res_.length)
        if(res_.length===0){
            const updatedPost = await Post.updateOne(
                {
                    _id:req.params.id,
                },
                {
                    $push:{'LikedBy':req.body}
                }
                
            );
            console.log("updated");
            res.status(200).json(updatedPost);
        }
        
    }catch(err){
        console.log(err)
    }
})
router.put("/dislike/:id",async(req,res)=>{
    console.log(req.body)
    try{
        const updatedPost = await Post.updateMany(
            {
                _id:req.params.id,
            },
            {
                $pull:{'LikedBy':{likedBy:req.body.likedBy}}
            }
            
        );
        res.status(200).json(updatedPost);
    }catch(err){}
})
router.put('/comment/:id',async(req,res)=>{
    console.log(req.body)
    try{
        const updatedPost = await Post.updateOne(
            {
                _id:req.params.id,
            },
            {
                $push:{'Comments':req.body}
            }
            
        );
        res.status(200).json(updatedPost);
    }catch(err){
        res.status(500).json(err);
    }
})
router.get("/find/all",async(req,res)=>{
    const page = req.query.page||0;
    const limit=10;
    const c=await Post.countDocuments();
    console.log(req.query)
    try{
        const posts = await Post.find()
        .sort({createdAt:-1})
        .skip(page*limit)
        .limit(limit);
        res.status(200).json({
            data:posts,
            count:posts.length,
            totalPages:Math.ceil(c/limit)-1,

            currentPage:page
        });
    }catch(err){
        res.status(500).json(err);
    }
})
router.get("/find/:authorId",async(req,res)=>{
    try{
        const post = await Post.findOne({authorId:req.params.authorId});
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})
router.get("/find/post/:id",async(req,res)=>{
    try{
        const post = await Post.findOne({_id:req.params?.id});
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
})
module.exports = router;
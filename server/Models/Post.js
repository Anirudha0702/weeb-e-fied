const mongoose=require("mongoose");

const PostSchema = new mongoose.Schema({
    body : {type: String, required: true},
    author:{type: String, required: true},
    authorId:{type: String, required: true},
    authorPhoto:{type: String, required: true},
    LikedBy:{type: Array, required: true},
    Comments:{type: Array, required: true},
}, {timestamps: true}
)
module.exports = mongoose.model("Post", PostSchema);
import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    picture :{
        type: String,
        required: true,       
        default:"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=", 
    },

    title :{
        type: String,
        required: true,
        unique: true,
    },

    message :{
        type: String,
        required: true,        
    },
    comments:[
        {
            user: {type: String, required:true},
            content: {type: String, required: true},
        },        
    ]

}, {timestamps:true});

const Post = mongoose.model('Post',postSchema);

export default Post;
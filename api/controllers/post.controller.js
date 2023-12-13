import Post from "../models/post.model.js";


export const getAllPost = async (req, res) => {
    try {
        let query = {};
        const posts = await Post.find(query);
        res.json(posts);
        console.log(posts);
    } catch (error) {
        console.log(error);
        // You might want to send an error response to the client here
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getPostId = async (req, res) => {
    try {
        const { postId } = req.params;
  
      // Fetch the post from the database by ID
      const post = await Post.findById(postId);
      console.log(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.json(post); 
      console.log(post);
    } catch (error) {
      console.error('Error fetching post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  export const addComment = async (req, res) => {
    try {
      const postId = req.params.postId;
      const { user, content } = req.body;
  
      // Encuentra el post por su ID y añade el comentario
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      post.comments.push({ user, content });
      await post.save();
  
      // Devuelve la lista actualizada de comentarios
      res.json({ comments: post.comments });
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
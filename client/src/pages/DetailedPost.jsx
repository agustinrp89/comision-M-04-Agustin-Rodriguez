import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';


const DetailedPost = () => {
    const { postId } = useParams();
    const location = useLocation();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ user: '', content: '' });
    const [error, setError] = useState(null);
  
    console.log('Extracted Post ID:', postId);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/post/${postId}`);
          const postData = await response.json();
          setPost(postData);
          setComments(postData.comments || []);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching post data:', error);
          setLoading(false);
          setError(error.message || 'Error fetching post data');
        }
      };
  
      fetchData();
    }, [postId]);
  
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    if (!post) {
      return <p>No data found for this post.</p>;
    }

    const handleCommentChange = (e) => {
        const { name, value } = e.target;
        setNewComment((prevComment) => ({ ...prevComment, [name]: value }));
      };
    
      const handleAddComment = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/post/${postId}/comment`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
              });
    
          if (!response.ok) {
            throw new Error(`Failed to add comment. Status: ${response.status}`);
          }
    
          const updatedPostData = await response.json();
          setComments((prevComments) => [...prevComments, ...updatedPostData.comments]);
          setNewComment({ user: '', content: '' });
        } catch (error) {
          console.error('Error adding comment:', error);
        }
      };
  
      return (
        <div className="container mx-auto mt-5">
          {/* Contenido del post */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : !post ? (
        <p>No data found for this post.</p>
      ) : (
        <div className='mx-auto text-center' style={{maxWidth:700}}>
          <h2 className="text-2xl font-bold mb-2 mt-10">{post.title}</h2>
          <img className="mx-auto max-w-full" style={{maxWidth:300}} src={post.picture} alt="" />
          <p>{post.message}</p>
        </div>
      )}
          <div className="mt-10 mx-auto text-center" style={{borderTop:'solid'}}>
            <h3 className="text-xl font-semibold mb-2 mt-5" >Comments</h3>
            <ul style={{maxWidth:600, display:'flex',flexDirection:'column', margin:"auto" }} >
              {comments.map((comment, index) => (
                
                <li key={index} className='flex mb-8' style={{maxWidth:600, display:'flex',flexDirection:'column', textAlign:'center' }}> 
                  <strong>{comment.user}:</strong> {comment.content}
                </li>
              ))}
            </ul>
    
            {/* Formulario para agregar comentarios */}
            <form onSubmit={handleAddComment} className="mt-10 mx-auto" style={{maxWidth:600, display:'flex',flexDirection:'column', }}>
              <label className="block mb-2">Your Name:</label>
              <input
                type="text"
                name="user"
                value={newComment.user}
                onChange={handleCommentChange}
                className="border rounded px-2 py-1 mb-2"
                required
              />
    
              <label className="block mb-2">Comment:</label>
              <textarea
                name="content"
                value={newComment.content}
                onChange={handleCommentChange}
                className="border rounded px-2 py-1 mb-2"
                required
              ></textarea>
    
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Comment
              </button>
            </form>
          </div>
        </div>
      );
    };
    
    export default DetailedPost;
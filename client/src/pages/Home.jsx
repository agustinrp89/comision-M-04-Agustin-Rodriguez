import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation

// Card component
const PostCard = ({ post }) => (
  
  <div className="max-w-sm mx-auto bg-white rounded overflow-hidden shadow-lg m-4 ">
    <img className="w-full h-48 object-cover" src={post.picture} alt="" />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{post.title}</div>
      <p className="text-gray-700 text-base mb-20 overflow-y-auto max-h-48 ">{post.message}</p>
      {/* Add a Link to navigate to a detailed page */}
      <Link to={`/post/${post._id}`} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        View Details
      </Link>
    </div>
  </div>
);

// Home component
function Home() {
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/post/getpost'); // Assuming your API is served on the same domain
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      {/* Render your posts data in cards */}
      <div className="flex flex-wrap justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          posts.map(post => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
}

export default Home;
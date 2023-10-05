import React, { useState, useEffect } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 
  useEffect(() => {
    // Calculate the start and end index for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Fetch data from the API
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Slice the data to get only the items for the current page
        const pagePosts = data.slice(startIndex, endIndex);
        setPosts(pagePosts);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className='bg-[#373737] p-4 text-white rounded-xl w-[200px] mx-auto '>Post List For 5 People</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <div className='mt-8 bg-[#fffafa] p-5 rounded-3xl  shadow-lg shadow-cyan-500/50'>
            <h1 className='m-4 text-black text-lg'> Title: {post.title}</h1>
           <h1 className='text-black text-xl'>  {post.body}</h1>
            </div>
            </li>
        ))}
      </ul>
      
    </div>
  );
};

export default PostList;

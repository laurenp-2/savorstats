import React, {useEffect, useState} from 'react'; 

const Feed = () => {
    const [posts, setPosts] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    //get posts 
    const fetchPosts = async () => {
        try {
            const response = await fetch('http//localhost:8080/feed');
            if (!response.ok){
                throw new Error(`Error fetching posts: ${response.statusText}`);
            }
            const data = await response.json(); 
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error); 
            setError(error.message); 
        } finally{
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchPosts(); 
    }, []);

    if (loading) return <p>Loading posts...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className="feed">
          <h2>Feed</h2>
          {posts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="postCard">
                <img
                  src={post.image || 'https://via.placeholder.com/150'}
                  alt={post.name}
                  className="postImage"
                />
                <h3>{post.name}</h3>
                <p>{post.description}</p>
                <a
                  href={post.recipeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Recipe
                </a>
                <p>⭐ {post.stars}</p>
                <p>
                  Time: {post.timeHours}h {post.timeMin}m
                </p>
              </div>
            ))
          )}
        </div>
      );

}

export default Feed; 
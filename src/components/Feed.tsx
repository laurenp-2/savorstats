import React, { useEffect, useState } from "react";

interface FeedProps {
  signedIn: boolean;
  onSignIn: () => void;
}

interface Post {
  id: string;
  name: string;
  image: string | null;
  description: string;
  recipeLink: string;
  stars: number;
  timeHours: number;
  timeMin: number;
}

const Feed: React.FC<FeedProps> = ({ signedIn, onSignIn }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:8080/feed");
      if (!response.ok) {
        throw new Error(`Error fetching posts: ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts2:", error);
      setError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (signedIn) {
      fetchPosts();
    }
  }, [signedIn]);

  return (
    <>
      {/* Sign in prompt if not signed in */}
      {!signedIn && (
        <div>
          <p>Sign in to view your feed!</p>
          <button onClick={onSignIn}>Sign in with Google</button>
        </div>
      )}
      {/* Feed content if signed in */}
      {signedIn && (
        <div className="feed">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          <h2>Feed</h2>
          {posts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="postCard">
                <img
                  src={post.image || "https://via.placeholder.com/150"}
                  alt={post.name}
                  className="postImage"
                />
                <h3>{post.name}</h3>
                {/* <h3>{post.id}</h3> */}
                <p>{post.description}</p>
                <a href={post.recipeLink} target="_blank" rel="noopener noreferrer">
                  View Recipe
                </a>
                <p>⭐ {post.stars}</p>
                <p>Time: {post.timeHours}h {post.timeMin}m</p>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Feed;
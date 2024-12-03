import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";

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
        <div className="signInPrompt">
          <p>Sign in to view your feed!</p>
          <button onClick={onSignIn}>Sign in with Google</button>
        </div>
      )}
      {/* Feed content if signed in */}
      {signedIn && (
        <div className="feed">
          {loading && <p id="loadingText">Loading...</p>}
          {error && <p>{error}</p>}
          {posts.length === 0 ? (
            <p>No posts available</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="postCard">
                <img
                  src={post.image || "https://via.placeholder.com/150"}
                  alt={post.name}
                  id="postImage"
                />
                <div className="postCardInfo">
                    <div className="postCardInfoFirstLine"> 
                      <h3>Name:{post.name}</h3>
                      
                      <div className="starRating">
                      {/* Render filled stars */}
                      {Array.from({ length: post.stars }, (_, index) => (
                        <Star key={index} color="gold" size={24} className="starIcon" id="filledPostStars"/>
                      ))}
                      {/* Render unfilled stars */}
                      {Array.from({ length: 5 - post.stars }, (_, index) => (
                        <Star key={post.stars + index} color="lightgray" size={24} className="starIcon" id="unfilledPostStars"/>
                      ))}
                    </div>
                      <p>Time: {post.timeHours}h {post.timeMin}m</p>
                    </div>
                    <p>Description:{post.description}</p>
                    <a href={post.recipeLink} target="_blank" rel="noopener noreferrer">
                        View Recipe
                      </a>
                  </div>
                
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default Feed;
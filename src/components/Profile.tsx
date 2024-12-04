import React, { useState } from "react";
import { useEffect } from "react";
import EditProfile from './EditProfile';
import { useAuth } from "../auth/AuthUserProvider";
import { Star, Trash2 } from "lucide-react";
import { post } from "node_modules/axios/index.d.cts";

interface Post {
  id: string,
  name: string, 
  image: string | undefined,
  description: string,
  recipeLink: string,
  stars: number, 
  timeHours: number,
  timeMin: number
}

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    username: user?.displayName || "Default Username",
    bio: "I love cooking!",
    profilePic: null as File | null,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const handleUpdateProfile = (
    updatedData: React.SetStateAction<{
      username: string; //generate random username like userpzm7zg, need to check if someone doesn't have this username Tho
      bio: string;
      profilePic: null | File;
    }>
  ) => {
    setProfileData(updatedData); // get from editProfile
    setIsEditing(false);
  };

  async function fetchUserPosts(uid: string){
    try{
      const response = await fetch(`http://localhost:8080/posts/${uid}`)
    if(!response.ok){
      throw new Error(`Failed to fetch posts: ${response.statusText}`);

    }
    const postsData = await response.json(); 
    return postsData; 
    } catch (error){
      console.error('Error fetching posts:', error); 
      return []; 
    }
  }

  async function deletePost(postId: string) {
    console.log("about to delete post", postId); 
    try {
      console.log("checker 1"); 
      const response = await fetch(`http://localhost:8080/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("checker 2"); 
  
      if (!response.ok) {
        console.log("checker 3"); 
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete post');
      }
      console.log("checker 4"); 
      const result = await response.json();
      console.log(result.message); // "Post deleted!"

      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

      return result;
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error; // Re-throw to allow caller to handle the error
    }
  }

  useEffect(() => {
    if(user?.uid){
        fetchUserPosts(user.uid).then((data) => setPosts(data));
    }
  }, [user?.uid]); 

  

  return (
    <div>
      {isEditing ? (
        // editProfile stuff
        <EditProfile
          profileData={profileData}
          onSave={handleUpdateProfile}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className="profileInfo">
            <div className="profileColOne">
                
              <img id="profilePicture"
                src={profileData.profilePic ? URL.createObjectURL(profileData.profilePic) : "assets/pfpCook.jpg"}

              />
              {/* <button onClick={() => setIsEditing(true)}>edit profile</button> */}
            </div>

            <div className="profileColTwo">
              <h2>{profileData.username}</h2>
              <p>{profileData.bio}</p>
            </div>
          </div>
          {/*Render posts */}
          <div className="profileFeed">
            <h3 id="postsHeader">My Posts</h3>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="postCard">
                <img
                  src={post.image || "assets/bakingplaceholder.jpg"}
                  alt={post.name}
                  id="postImage"
                />
                <div className="postCardInfo">
                    <div className="postCardInfoFirstLine"> 
                      <h3>{post.name}</h3>
                      
                      <div className="starRating">
            
                      {Array.from({ length: post.stars }, (_, index) => (
                        <Star key={index}  size={24} className="starIcon" id="filledPostStars"/>
                      ))}
                     
                      {Array.from({ length: 5 - post.stars }, (_, index) => (
                        <Star key={post.stars + index} size={24} className="starIcon" id="unfilledPostStars"/>
                      ))}
                    </div>
                      <p>Time: {post.timeHours}h {post.timeMin}m</p>
                      <Trash2 onClick={() => deletePost(post.id)}/>
                    </div>
                    <p>{post.description}</p>
                    <a href={post.recipeLink} target="_blank" rel="noopener noreferrer">
                        View Recipe
                      </a>
                  </div>
                
              </div>
              ))
            ) : (
              <p>No posts to display.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

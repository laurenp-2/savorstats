import React, { useState } from "react";
import { useEffect } from "react";
import EditProfile from './editProfile'
import { useAuth } from "../auth/AuthUserProvider";

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
    console.log(postsData);
    return postsData; 
    } catch (error){
      console.error('Error fetching posts:', error); 
      return []; 
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
                src={profileData.profilePic ? URL.createObjectURL(profileData.profilePic) : "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}

              />
              <button onClick={() => setIsEditing(true)}>edit profile</button>
            </div>

            <div className="profileColTwo">
              <h2>{profileData.username}</h2>
              <p>{profileData.bio}</p>
            </div>
          </div>
          {/*Render posts */}
          <div className="profileFeed">
            <h3>My Posts</h3>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key ={post.id} className = "postCard">
                  <img src={post.image} className = "postImage" /> 
                  <h4>{post.name}</h4>
                  <p>{post.description}</p>
                  <a href = {post.recipeLink} target ="_blank" rel = "noopener noreferrer">
                    View Recipe 
                  </a>
                  <p>{post.stars}</p>
                  <p> {post.timeHours}h {post.timeMin}m</p>
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

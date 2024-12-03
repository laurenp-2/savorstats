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
                src={profileData.profilePic ? URL.createObjectURL(profileData.profilePic) : "https://mail.google.com/mail/u/0?ui=2&ik=111393ad16&attid=0.3&permmsgid=msg-a:r-8026863741303203587&th=1938e7c6ca7c39da&view=fimg&fur=ip&permmsgid=msg-a:r-8026863741303203587&sz=s0-l75-ft&attbid=ANGjdJ9fX92x-lT5IPCqZ8kg_R3DTndvlPgpCUEw4vxFIiTgWruSlCp1dxsTlpXfU2QTPoe6A20RV8fYAZV_PeGRd_DWFE92ol9N4cws_Srvqoy3i1dqNJ0OKDtKqFU&disp=emb&realattid=3394B53E-44EE-46B5-B447-518CA7C823E1&zw"}
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

import React, { useState } from "react";
import EditProfile from "./editProfile";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    username: `user${Math.random().toString(36).substring(2, 8)}`, //generate random username like userpzm7zg, need to check if someone doesn't have this username Tho
    bio: "I love cooking!",
    profilePic: null as File | null,
  });

  const [isEditing, setIsEditing] = useState(false);

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
        </>
      )}
    </div>
  );
};

export default Profile;

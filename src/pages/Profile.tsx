import React, { useState } from "react";
import EditProfile from "./EditProfile"; 

const Profile = () => {
    const [profileData, setProfileData] = useState({
        username: `user${Math.random().toString(36).substring(2, 8)}`, //generate random username like userpzm7zg, need to check if someone doesn't have this username Tho 
        bio: "",
        profilePic: null,
    });

    const [isediting, setIsEditing] = useState(false);

    const handleUpdateProfile = (updatedData) => {
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
                    <h1>Your Profile</h1>
                    <img 
                        src = {profileData.profilePic || "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"}
                        style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                    />
                    <h2>{profileData.username}</h2>
                    <p>{profileData.bio}</p>
                    <button onClick = {() => setIsEditing(true)}>edit profile</button>
                </>
            )}

        </div>
    );

}

export default Profile; 
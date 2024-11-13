/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent } from "react";
import { useState } from "react";

interface EditProfileProps {
  profileData: {
    username: string;
    bio: string;
    profilePic: File | null;
  };
  onSave: (updatedData: {
    username: string;
    bio: string;
    profilePic: File | null;
  }) => void;
  onCancel: () => void;
}

const EditProfile = ({ profileData, onSave, onCancel }: EditProfileProps) => {
  const [username, setUsername] = useState(profileData.username);
  const [bio, setBio] = useState(profileData.bio);
  const [profilePic, setProfilePic] = useState<File | null>(
    profileData.profilePic
  );

  const uploadImg = async (event: ChangeEvent<HTMLInputElement>) => {
    //stuff to do when image is uploaded
    const file = event.target.files?.[0];
    if (file != null && file.type.startsWith("image/")) {
      setProfilePic(file);
    }
  };

  const handleSave = () => {
    onSave({
      username,
      bio,
      profilePic,
    });
  };

  return (
    <>
      <div className="updateProfile">
        <div className="updateUsername">
          <p>Username:</p>
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="updateBio">
          <p>Bio:</p>
          <textarea
            placeholder="bio"
            value={bio}
            onChange={(event) => {
              setBio(event.target.value);
            }}
          />
        </div>
        <div className="updateProfPic">
          <p>Profile Pic:</p>
          <input accept="image/*" type="file" onChange={uploadImg} />
        </div>
      </div>
      <div className="updateProfButtons">
        <button onClick={handleSave}>Save Changes</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </>
  );
};

export default EditProfile;

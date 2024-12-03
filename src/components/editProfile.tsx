//import { ChangeEvent } from "react";
import { useState } from "react";
import { useAuth } from "../auth/AuthUserProvider";
//import { auth, database } from "../utils/firebase";

interface EditProfileProps {
  profileData: {
    username: string;
    bio: string;
    // profilePic: File | null; // Removed image handling
  };
  onSave: (updatedData: {
    username: string;
    bio: string;
    // profilePic: File | null; // Removed image handling
  }) => void;
  onCancel: () => void;
}

const EditProfile = ({ profileData, onSave, onCancel }: EditProfileProps) => {
  const { user } = useAuth();
  const [username, setUsername] = useState(profileData.username);
  const [bio, setBio] = useState(profileData.bio);

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/users/${user?.uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          bio,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${await response.text()}`);
      }

      const data = await response.json();
      console.log("Profile updated successfully", data);

      onSave({
        username,
        bio,
        // profilePic: undefined, // Uncomment if you decide to add image handling later
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
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
      </div>
      <div className="updateProfButtons">
        <button onClick={handleSave}>Save Changes</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </>
  );
};

export default EditProfile;

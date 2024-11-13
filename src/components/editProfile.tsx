import React, { useState } from "react";

const editProfile = () => {
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [profilePic, setProfilePic] = useState(null)

    const uploadImg = (event) => {
        setProfilePic(event.target.files[0]);
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
            <input type="text" placeholder="username" value={username} onChange = {event => {setName(event.target.value)}}/>
            <input type="text" placeholder="bio" value={bio} onChange = {event => {setName(event.target.value)}}/>

            <input type="file" onChange={uploadImg}/>
            <button onClick={handleSave}>Save Changes</button>
            <button onClick={onCancel}>Cancel</button>

        </>
    );

}

export default editProfile; 
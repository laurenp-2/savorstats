import { useState } from "react";
import { Star } from 'lucide-react';

const Upload = () => {
    const[name, setName] = useState("");
    const[stars, setStars] = useState(0); 
    const[description, setDescription] = useState(""); 
    const[recipeLink, setRecipeLink] = useState(""); 
    const[timeHours, setTimeHours] = useState(0); 
    const[timeMin, setTimeMin] = useState(0); 
    const[image, setImage] = useState(null); 

    const uploadImg = (event) => {
        //stuff to do when image is uploaded
        setImage(event.target.files[0]); 
    }
    
    const uploadPost = () => {
        //stuff to do when the post is to be uploaded
    }



    return (
        <>
            <input type="text" placeholder="Name" value={name} onChange = {event => {setName(event.target.value)}}/>
            <Star onClick = {setStars(stars + 1)}></Star>
            <input type="text" placeholder="Description" value={description} onChange={event => {setDescription(event.target.value)}}/>
            <input type="text" placeholder="Link of Recipe" value={recipeLink} onChange={event => {setRecipeLink(event.target.value)}}/>
            
            <input type="file" onChange={uploadImg}/>
        
            <button onClick={uploadPost}>Upload</button>
        </>
    );

}

export default Upload; 
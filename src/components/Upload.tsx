/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, ChangeEvent } from "react";
import { Star } from "lucide-react";
import { database } from "../utils/firebase";
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Upload = () => {
  const [name, setName] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [recipeLink, setRecipeLink] = useState("");
  const [timeHours, setTimeHours] = useState(0);
  const [timeMin, setTimeMin] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [hoveredStar, setHoveredStar] = useState(0);

  const reset = () => {
    setName("");
    setStars(0);
    setDescription("");
    setRecipeLink("");
    setTimeHours(0);
    setTimeMin(0);
    setImage(null);
    setHoveredStar(0);
  };

  interface PostData {
    name: string;
    description: string;
    recipeLink: string;
    timeHours: number;
    timeMin: number;
    stars: number;
    image: string | null;
  }
  

  const uploadImg = async (event: ChangeEvent<HTMLInputElement>) => {
    //stuff to do when image is uploaded
    const file = event.target.files?.[0];
    if (file != null && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  const storage = getStorage();

  async function createPost(postData: PostData){
    //handles the image being a URL and ensure image is permanently stored in FireStore
    try {
      let imageUrl: string | null = null;
      if (image) {
        const imageRef = ref(storage, `images/${Date.now()}_${image.name}`);
        const uploadTask = uploadBytesResumable(imageRef, image); 
        
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            null, 
            (error) => reject(error), 
            async () => {
              imageUrl = await getDownloadURL(uploadTask.snapshot.ref); 
              resolve(imageUrl);
            }
          );
        });
      }
  
      const response2 = await fetch('http://localhost:8080/addPost', {
        method: 'POST', 
        headers: {
          'Content-Type' : 'application/json', 
        }, 
        body: JSON.stringify(postData),
      });

      if(!response2.ok){
        throw new Error(`Failed to create post: ${response2.statusText}`);
      }

      const result = await response2.json();
      const userRef = doc(database, "posts");
      console.log('Image URL:', imageUrl); 
      await setDoc(userRef, {
          name: postData.name,
          description: postData.description,
          recipeLink: postData.recipeLink,
          timeHours: postData.timeHours,
          timeMin: postData.timeMin,
          stars: postData.stars,
          image: imageUrl,
          date: new Date(),
      });
      console.log('Post created successfully:', result); 
      return result; 

    } catch (error){
      console.error('Error creating post: ', error);
    }
  }

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((rating) => (
      <Star
        key={rating}
        onClick={() => setStars(rating)}
        onMouseEnter={() => setHoveredStar(rating)}
        onMouseLeave={() => setHoveredStar(0)}
        fill={rating <= (hoveredStar || stars) ? "#ffbc64" : "#fff6eb"}
        style={{ cursor: "pointer" }}
        className="starIcon"
      />
    ));
  };

  return (
    <>
      <div className="inputFields">
        <div className="firstRowInputs">
          <input
            id="nameInput"
            type="text"
            placeholder="Recipe Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />

          <div className="timeInput">
            <input
              type="number"
              value={timeHours}
              min={1}
              max={12}
              onChange={(event) => {
                setTimeHours(event.target.valueAsNumber);
              }}
            />
            <p>:</p>
            <input
              type="number"
              value={timeMin}
              min={0}
              max={59}
              onChange={(event) => {
                setTimeMin(event.target.valueAsNumber);
              }}
            />
          </div>

          <div className="starRender">{renderStars()}</div>
        </div>

        <div className="secondRowInputs">
          <div className="columnInputs">
            <textarea
              id="descriptionInput"
              placeholder="Description"
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Link to Recipe"
              value={recipeLink}
              onChange={(event) => {
                setRecipeLink(event.target.value);
              }}
            />
          </div>
          <input
            id="uploadImgInput"
            accept="image/*"
            type="file"
            onChange={uploadImg}
          />
          {!image ? (
            <>
              <label htmlFor="uploadImgInput" id="uploadImgLabel">
                Upload Image
              </label>
            </>
          ) : (
            <div className="imageInputtedCol">
              {image && (
                <img
                  id="inputtedImg"
                  src={URL.createObjectURL(image)}
                  alt="Uploaded preview"
                />
              )}

              <label htmlFor="uploadImgInput" id="uploadedImgLabel">
                Change Image
              </label>
            </div>
          )}
        </div>

        <button
        id="uploadButton"
        onClick={() =>
          createPost({
            name,
            description,
            recipeLink,
            timeHours,
            timeMin,
            stars,
            image : image ? URL.createObjectURL(image) : null,
          })
        }
      >
        Upload
      </button>
      </div>
    </>
  );
};

export default Upload;

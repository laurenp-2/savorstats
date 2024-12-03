/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, ChangeEvent } from "react";
import { Star } from "lucide-react";
import { database } from "../utils/firebase";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useAuth } from "../auth/AuthUserProvider";
//import { post } from "node_modules/axios/index.d.cts";

const Upload = () => {
  const [name, setName] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [recipeLink, setRecipeLink] = useState("");
  const [timeHours, setTimeHours] = useState(0);
  const [timeMin, setTimeMin] = useState(0);
//  const [image, setImage] = useState<File | null>(null);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [date, setDate] = useState(null)


  const reset = () => {
    setName("");
    setStars(0);
    setDescription("");
    setRecipeLink("");
    setTimeHours(0);
    setTimeMin(0);
  //  setImage(null);
    setHoveredStar(0);
    setDate(null);
  };

  interface PostData {
    name: string;
    description: string;
    recipeLink: string;
    timeHours: number;
    timeMin: number;
    stars: number;
    date: Date | null,
   // image: string | null;
  }
  


  const storage = getStorage();

  const { user } = useAuth();

  async function createPost(postData: PostData){
    try {
      const response = await fetch('http://localhost:8080/addPost', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            description: postData.description,
           // image: 'image_url',
            name: postData.name,
            recipeLink: postData.recipeLink,
            stars: postData.stars,
            timeHours: postData.timeHours,
            timeMin: postData.timeMin,
            date: new Date(),
            userId: user?.uid, 
        })
       });

       if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${await response.text()}`);
      }
       const data = await response.json();
       console.log(data);
        return data;
     } 
     catch (error) {
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
           // onChange={uploadImg}
          />
          {/* {!image ? (
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
          )} */}
        </div>

        <button
        id="uploadButton"
        onClick={() => {
          createPost({
            name,
            description,
            recipeLink,
            timeHours,
            timeMin,
            stars,
            date: new Date(),
        //    image : image ? URL.createObjectURL(image) : null,
          });
          reset();
        }}
      >
        Upload
      </button>
      </div>
    </>
  );
};

export default Upload;

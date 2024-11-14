import { useState, ChangeEvent } from "react";
import { Star } from "lucide-react";

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

  const uploadImg = async (event: ChangeEvent<HTMLInputElement>) => {
    //stuff to do when image is uploaded
    const file = event.target.files?.[0];
    if (file != null && file.type.startsWith("image/")) {
      setImage(file);
    }
  };

  const uploadPost = () => {
    //stuff to do when the post is to be uploaded
    const postData = {
      name,
      stars,
      description,
      recipeLink,
      timeHours,
      timeMin,
      image,
    };
    //add stuff handling sending postData to the server

    reset(); 
  };

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
            type="text"
            placeholder="Name"
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
              placeholder="Link of Recipe"
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
             {image && (<img id="inputtedImg" src={URL.createObjectURL(image)} alt="Uploaded preview" />)}
              
            
            <label htmlFor="uploadImgInput" id="uploadedImgLabel">
                Change Image
              </label>
            </div>
          )}
        </div>

        <button id="uploadButton" onClick={uploadPost}>
          Upload
        </button>
      </div>
    </>
  );
};

export default Upload;
import express from 'express';
export default App;


const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());

const db = admin.firestore();


//for creating new account 
app.post('/signup', (req, res) => {
  const {username, password} = req.body
  try {
    const db = admin.firestore();

    if(!username || !password ){
      
    }


  } catch (error) {
    
  }

});

//updating profile 
app.put('/users/:userId', (req, res) => {
  const userId = req.params.userId; 
  const {username, bio, profilePic} = req.body; 

  //check if anything was edited 
  if(!username && !bio && !profilePic){
    return res.status(400).json({'no changes made'});
  }

  try {
    const db = admin.firestore();
    //change 'users' when get firestore set up and category names 
    const userRef = db.collection('users').doc(userId);

    //check if username is unique

    if(username){
      const userCheck = await db.collection('users').where('username', '==', username);
      if(!usernameSnapshot.empty){
        //make sure the username is someone elses and they're not just using the same one
        existingUser = userCheck.docs[0].id; 
        if(existingUser !== userId){
          return res.status(400).json({error: 'Username is already taken'});
        }
      }
    }
    //update data 
    const updates = {}
    if (username) updates.username = username; 
    if (bio) updates.bio = bio; 
    if (profilePic) updates.profilePic = profilePic; 

    await userRef.update(updates);

    res.status(200).json({
      message: 'profile updated successfully!'
    });
  } catch (error){
    console.log('Error updating profile', error);
    res.status(500).json({error: 'Error updating profile'});
  }
  
});

//getting a users profile
app.get('/feed/:userID', (req, res) => {
  try {
    const db = admin.firestore();
    const id = req.params.id;

    const user = db.find(user => user.id === id);
    res.status(200).json(user);
    if(!user){
      console.error('user not found')
      return res.status(404).json({error: 'User not found'})
    }
  
  } catch (error) {
    console.log(error);
    res.status(500).json({error: "error fetching user's posts"});
  }
});

//create a new post 
app.post('/addPost', async (req, res) => {
  const { description, image, name, recipeLink, stars, timeHours, timeMin } = req.body;

  // Validate input
  if (!description || !image || !name || !recipeLink || stars === undefined || timeHours === undefined || timeMin === undefined) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Reference to the Firestore database
    const db = admin.firestore();

    // Create a new document in the 'posts' collection
    const newPost = {
      description,
      image,
      name,
      recipeLink,
      stars,
      timeHours,
      timeMin,
    };

    const postRef = await db.collection('posts').add(newPost);

    // Respond with the document ID
    return res.status(201).json({ message: 'Post added successfully!', postId: postRef.id });
  } catch (error) {
    console.log('Error adding post:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

//deleting a post
app.delete('/posts/:postId', (req, res) => {
  const postId = req.params.postId;
  res.json({ message: `Deleted post with ID: ${postId}` });
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


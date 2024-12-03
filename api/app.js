/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors'; 
import admin from 'firebase-admin';
import serviceAccount from './ServiceAccountKey.json' assert { type: 'json' };


const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount), 
  databaseURL: "https://<savorstats-89306>.firebaseio.com" 
});

const db = admin.firestore();


//Signup endpoint 
app.post('/signup', async(req, res) => {
  try {
    const db = admin.firestore();
    const {uid, email, name, photoURL} = req.body


    if((!uid && !email) || !name || !photoURL ){
      return res.status(400).json({ error: 'uid/email is required' });
    }

    // Check if the user already exists in Firestore
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      // User already exists, return a message
      return res.status(200).json({ message: 'User already exists.', user: userDoc.data() });
    }

    // Create a new user document in Firestoreg
    await userRef.set({
      uid,
      email,
      name,
      photoURL,
      lastLogin: new Date().toISOString(),
    });
    // Respond with success message
    res.status(201).json({ message: 'New account created successfully!', uid });

  } catch (error) {
    console.error('Error creating new account:', error);
    res.status(500).json({ error: 'Error creating new account.' });
  }
});

//Update Profile
app.put('/users/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { username, bio } = req.body;

  if (!username && !bio) {
    return res.status(400).json({ error: 'No changes made' });
  }

  try {
    const userRef = db.collection('users').doc(userId);

    if (username) {
      const usernameCheck = await db.collection('users').where('username', '==', username).get();
      if (!usernameCheck.empty) {
        return res.status(400).json({ error: 'Username is already taken' });
      }
    }

    const updates = {};
    if (username) updates.username = username;
    if (bio) updates.bio = bio;

    await userRef.update(updates);

    res.status(200).json({ message: 'Profile updated successfully!' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Error updating profile' });
  }
});

//getting a users profile
app.get('/feed/:uid', async (req, res) => {
  const uid = req.params.uid;

  try {
    const db = admin.firestore();
    const userRef = db.collection('users').doc(uid);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userSnapshot.data();
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get all of a users posts
app.get('/posts/:username', async (req, res) =>{
  try {
    const db = admin.firestore(); 
    const uid = req.params.uid; 

    const postsSnapshot = await db.collection('posts').where('uid', '==', uid).get(); 

    const posts = postsSnapshot.docs.map((doc) => ({
      id: doc.id, 
      ...doc.data(),
    }));
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error); 
    res.status(500).json({error: 'Internal server error.'}); 
    
  }
});

//create a new post 
app.post('/addPost', async (req, res) => {

  try {
    // Reference to the Firestore database
    const db = admin.firestore();

    const { description, image, name, recipeLink, stars, timeHours, timeMin, uid } = req.body;

    // Validate input
    if (!description || !image || !name || !recipeLink || stars === undefined || timeHours === undefined || timeMin === undefined ||!uid) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // const postRef = db.collection('posts').doc(uid); 
    // const postID = postRef.uid; // Firestore generated ID

    // Create a new document in the 'posts' collection
    const newPost = {
      postId, 
      description,
      image,
      name,
      recipeLink,
      stars,
      timeHours,
      timeMin,
      uid,
    };

    await postRef.set(newPost) 

    // Respond with the document ID
    return res.status(201).json({ message: 'Post added successfully!', postId: postRef.id });
  } catch (error) {
    console.log('Error adding post:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

//deleting a post
app.delete('/posts/:postId', async (req, res) => {
  const postId = req.params.postID;
  try {
    const postRef = db.collection('posts').doc(postID);

    //check if post exists
    const postSnapshot = await postRef.get(); 
    if(!postSnapshot.exists){
      return res.status(404).json({error: 'Post not found.'});
    }

    await postRef.delete(); 
    res.status(200).json({message: `Post deleted!`});
  } catch (error){
    console.error('Error deleting post:', error); 
    res.status(500).json({error: 'Internal server error'}); 
  }
});

//get all posts 
app.get('/feed', async (req, res) =>{
  try {
    const db = admin.firestore();
    const postsSnapshot = await db.collection('posts').get(); 

    const posts = postsSnapshot.docs.map((doc) => ({
      id: doc.id, 
      ...doc.data,
    }));
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error); 
    res.status(500).json({error: 'Internal server error'}); 
  }
  
})



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

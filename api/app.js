
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


//for creating new account 
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

// //updating profile 
// app.put('/users/:userId', async (req, res) => {
//   const userId = req.params.uid; 
//   const {username, bio, profilePic} = req.body; 

//   //check if anything was edited 
//   if(!username && !bio && !profilePic){
//     return res.status(400).json({error: 'no changes made'});
//   }

//   try {
//     const db = admin.firestore();
//     //change 'users' when get firestore set up and category names 
//     const userRef = db.collection('users').doc(uid);

//     //check if username is unique

//     if(username){
//       const userCheck = await db.collection('users').where('username', '==', username);
//       if(!usernameSnapshot.empty){
//         //make sure the username is someone elses and they're not just using the same one
//         existingUser = userCheck.docs[0].id; 
//         if(existingUser !== userId){
//           return res.status(400).json({error: 'Username is already taken'});
//         }
//       }
//     }
//     //update data 
//     const updates = {}
//     if (username) updates.username = username; 
//     if (bio) updates.bio = bio; 
//     if (profilePic) updates.profilePic = profilePic; 

//     await userRef.update(updates);

//     res.status(200).json({
//       message: 'profile updated successfully!'
//     });
//   } catch (error){
//     console.log('Error updating profile', error);
//     res.status(500).json({error: 'Error updating profile'});
//   }
  
// });

//updating profile 
app.put('/users/:userId', async (req, res) => {
  const userId = req.params.uid; 
  const {username, bio, profilePic} = req.body; 

  //check if anything was edited 
  if(!username && !bio && !profilePic){
    return res.status(400).json({error: 'no changes made'});
  }

  try {
    const db = admin.firestore();
    //change 'users' when get firestore set up and category names 
    const userRef = db.collection('users').doc(userId);

    //check if username is unique
    const usernameSnapshot = await userRef.get();

    if(username){
      const userCheck = await db.collection('users').where('username', '==', username);
      if(!usernameSnapshot.empty){
        //make sure the username is someone elses and they're not just using the same one
        const existingUser = userCheck.docs[0].id; 
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
    console.log('Received request body:', req.body);
    const { description, name, recipeLink, stars, timeHours, timeMin, date, userId } = req.body;

    // Validate input
    if (!description || !name || !recipeLink || stars === undefined || timeHours === undefined || timeMin === undefined || date === undefined) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

      const db = admin.firestore();
      const userDocRef = db.collection('users').doc(userId);  // Reference to a specific user's document
      const postCollection = userDocRef.collection('posts');   // Create a 'posts' sub-collection for the user
      const newPostRef = postCollection.doc();  // Auto-generate ID for the new post
      const newPost = { ...req.body, postId: newPostRef.id };
      await newPostRef.set(newPost);

    return res.status(201).json({ message: 'Post added successfully!', postId: newPostRef.id });
    } catch (error) {
    console.log('Error adding post:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

//deleting a post
app.delete('/posts/:postId', async (req, res) => {
  const postId = req.params.postId; 
  try {
    const postRef = db.collection('posts').doc(postId);

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


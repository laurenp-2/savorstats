import express from 'express';

const app = express();
const port = 8080;
app.use(express.json());
app.use(cors());

//for logging in 
app.post('/login', (req, res) => {
  const {username, password} = req.body
  if (username === 'admin' && password === 'password123') {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }

});

//getting posts from profile
app.get('/feed', (req, res) => {
  res.json({ message: 'Fetched all posts from the profile' });
});

//create a new post
app.post('/posts', (req, res) =>{
  const{name, stars, description, recipeLink, timeHours, timeMin, image} = req.body;
  res.status(201).json({ message: 'Created new post', data: { name, stars, description, recipeLink, timeHours, timeMin, image } });
});

//deleting a post
app.delete('/posts/:postId', (req, res) => {
  const postId = req.params.postId;
  res.json({ message: `Deleted post with ID: ${postId}` });
});

//updating profile 
app.put('/api/users/:userId', (req, res) => {
  const username = req.params.username;
  const updatedProfile = req.body;
  res.json({ message: `Updated profile for user: ${username}`, data: updatedProfile });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
import express from 'express';
import cors from 'cors'; // CORS is needed to allow requests from React to Express

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON data
app.use(express.json());

// Enable CORS for your React app's URL
app.use(cors({
  origin: "http://localhost:3000" // React app's URL
}));

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.post('/addPost', (req, res) => {
  const postData = req.body;  // Get the data from the request body
  console.log('Received post data:', postData);  // Log the received data (optional)

  // Here, you would typically save postData to a database, like Firebase
  // For now, you can just send a success response:
  res.status(200).json({ message: 'Post created successfully' });
});


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

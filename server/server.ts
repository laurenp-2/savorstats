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

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

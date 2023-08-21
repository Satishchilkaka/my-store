import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3001; // Choose a port number

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // In a real application, perform authentication logic here
  // For demonstration purposes, we'll assume success for now
  const successResponse = {
    message: 'Login successful'
  };

  res.status(200).json(successResponse);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

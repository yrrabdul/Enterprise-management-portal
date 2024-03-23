const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 


const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/portal', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.json());


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

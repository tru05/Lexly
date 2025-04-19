const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/synthesize', async (req, res) => {
  console.log('Server-side endpoint hit');
  const { text, projectId } = req.body;

  try {
    const response = await axios.post(
      `https://api.deepgram.com/v1/projects/${projectId}/synthesize`,
      {
        text,
        model: 'en-US',
        container: 'wav'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 5e2d2a3dc4ae89b9ed210ebc499371284be976dc'
        }
      }
    );

    res.json({ audioUrl: response.data.url });
  } catch (error) {
    console.error('Error details:', error.response.data);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

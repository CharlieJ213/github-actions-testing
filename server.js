import express from 'express';

const app = express();
const port = process.env.PORT || 8080;

const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || 'http://localhost:9200';

// Middleware to parse JSON bodies
app.use(express.json());

// Logging endpoint
app.post('/log', async (req, res) => {
    const logData = req.body;
    console.log('Received log data:', logData);
    console.log('ElasticSearchURL:', ELASTICSEARCH_URL);
    try {
        // Send log data to ELK stack
        const response = await fetch(`${ELASTICSEARCH_URL}/logs/_doc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(logData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        res.status(200).send('Log data sent to ELK stack');
    } catch (error) {
        console.error('Error sending log data to ELK stack:', error);
        res.status(500).send('Error sending log data to ELK stack');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;

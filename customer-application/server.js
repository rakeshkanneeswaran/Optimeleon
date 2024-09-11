const express = require('express');
const path = require('path');

const app = express();
const port = 3004;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the generated script
app.get('/script.js', (req, res) => {
    const script = `
        (function() {
            const variations = ['a', 'b', 'c', 'd'];
            const now = new Date();
            const variation = variations[Math.floor(now.getHours() / 6) % 4];
            const scriptElement = document.createElement('script');

            document.head.appendChild(scriptElement);
        })();
    `;
    res.type('application/javascript');
    res.send(script);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

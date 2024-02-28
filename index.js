const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware'); // Ensure you have http-proxy-middleware installed
const app = express();
const port = 3000;

// Serves static files from the 'public' directory
app.use(express.static('public'));

// Proxy requests to the generator server
app.use('/generate', createProxyMiddleware({
    target: 'http://localhost:3001', // URL of the generator server
    changeOrigin: true,
    pathRewrite: {
        '^/generate': '', // Remove the '/generate' prefix
    },
}));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

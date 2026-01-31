const express = require('express');
const path = require('path');
const app = express();

const port = 8080;
const distPath = path.join(__dirname, '.');
const dataPath = path.join(distPath, 'data');


app.use('/data', express.static(dataPath));
app.use(express.static(distPath));


app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(port, () => {
    console.log('Server listening on: http://localhost:%s', port);
});

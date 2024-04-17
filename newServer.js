const express = require('express');

const routes = require('./routes/routes.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');

const PORT = process.env.PORT || 6020;

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, '../out')));
routes(server);

const executeCommand = () => {
    exec('nmcli radio wifi off', (error, stdout, stderr) => {
        if (error) {
            console.error('Error executing command:', error);
            return;
        }
        console.log('Command executed successfully:', stdout);
    });
};

const handleServerStart = (err) => {
    if (err) {
        console.error('Server failed to start:', err);
        return;
    }
    console.log(`Server is running on http://localhost:${PORT}`);
    executeCommand();
};

server.get('*', (req, res) => {
    return handle(req, res);
});

server.listen(PORT, handleServerStart);
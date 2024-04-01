// server.js
const express = require('express');
const next = require('next');
const routes = require('./routes/routes.js');
const bodyParser = require('body-parser');
const cors = require('cors');
const {exec} = require('child_process');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const PORT = process.env.PORT || 6020;

nextApp.prepare().then(() => {
    const server = express();
    server.use(cors());
    server.use(bodyParser.json());

    routes(server);

    server.get('*',(req,res) =>{
        return handle(req, res);
    })

    const executeCommand = () => {
        exec('nmcli radio wifi off',(error,stdout,stderr) => {
            if(error){
                return;
            }
        })
    }

    server.listen(PORT, err => {
        if(err) throw err;
        console.log(`> Ready on http://localhost:${PORT}`);
        executeCommand();
    });
});
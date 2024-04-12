const { exec } = require('child_process');

const stopStreamingCommand = 'pkill -f mjpg_streamer'; // Command to kill the mjpg_streamer process

const handleEndStream = (req, res) => {
    
    exec(stopStreamingCommand, (error, stdout, stderr)=> {
        if (error) {  
            return;
        }
    });

};

module.exports = {
    handleEndStream
};

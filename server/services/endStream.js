const { exec } = require('child_process');

const stopStreamingCommand = 'pkill -f mjpg_streamer'; // Command to kill the mjpg_streamer process

const handleEndStream = (req, res) => {
    const { stream } = req.body;
    
    exec(stopStreamingCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error stopping streaming: ${error.message}`);
            res.status(500).json({ success: false, message: `Error stopping streaming: ${error.message}` });
            return;
        }
        if (stderr) {
            console.error(`Stopping streaming stderr: ${stderr}`);
            res.status(500).json({ success: false, message: `Stopping streaming stderr: ${stderr}` });
            return;
        }
        console.log(`Stopping streaming stdout: ${stdout}`);
        res.status(200).json({ success: true, message: 'Streaming stopped successfully' });
    });

}

module.exports = {
    handleEndStream
};

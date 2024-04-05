const { exec } = require('child_process');

const startStreamingCommand = 'cd /home/wireless/mjpg-streamer-master/mjpg-streamer-experimental/ && ./mjpg_streamer -i "/usr/local/lib/mjpg-streamer/input_uvc.so -y -d /dev/video0 -n -f 6 -r 640x480" -o "/usr/local/lib/mjpg-streamer/output_http.so -p 8084 -w /usr/local/share/mjpg-streamer/www" &';

const handleStartStream = (req, res) => {
    const { stream } = req.body;
    exec(startStreamingCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error starting streaming: ${error.message}`);
            res.status(500).json({ success: false, message: `Error starting streaming: ${error.message}` });
            return;
        }
        if (stderr) {
            console.error(`Streaming stderr: ${stderr}`);
            res.status(500).json({ success: false, message: `Streaming stderr: ${stderr}` });
            return;
        }
        console.log(`Streaming stdout: ${stdout}`);
        res.status(200).json({ success: true, message: 'Streaming started successfully' });
    });

}

module.exports = {
    handleStartStream
};

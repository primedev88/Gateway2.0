const { exec } = require('child_process');

const startStreamingCommand = 'cd /home/wireless/mjpg-streamer-master/mjpg-streamer-experimental/ && ./mjpg_streamer -i "/usr/local/lib/mjpg-streamer/input_uvc.so -y -d /dev/video0 -n -f 6 -r 640x480" -o "/usr/local/lib/mjpg-streamer/output_http.so -p 8084 -w /usr/local/share/mjpg-streamer/www" &';

const handleStartStream = (req, res) => {
    
    exec(startStreamingCommand, (error, stdout, stderr));

}

module.exports = {
    handleStartStream
};

const { exec } = require('child_process');

const stopStreamingCommand = 'pkill -f mjpg_streamer'; // Command to kill the mjpg_streamer process

const handleEndStream = (req, res) => {
    const { stream } = req.body;

    // Function to kill a process running on a specific port
    const killProcessOnPort = (port) => {
        const command = process.platform === 'win32' ?
            `netstat -ano | findstr :${port}` :
            `lsof -i :${port}`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing command: ${error.message}`);
                return;
            }

            const lines = stdout.trim().split('\n');
            if (lines.length < 2) {
                console.log(`No process running on port ${port}`);
                return;
            }

            const pid = lines[1].trim().split(/\s+/).pop();
            const killCommand = process.platform === 'win32' ?
                `taskkill /PID ${pid} /F` :
                `kill ${pid}`;

            exec(killCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error killing process: ${error.message}`);
                    return;
                }
                console.log(`Process with PID ${pid} killed`);
            });
        });
    };

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

        // Kill process running on port 8084 (adjust the port as needed)
        killProcessOnPort(8084);

        res.status(200).json({ success: true, message: 'Streaming stopped successfully' });
    });

};

module.exports = {
    handleEndStream
};

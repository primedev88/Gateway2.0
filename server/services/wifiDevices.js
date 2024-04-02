// This module returns the number of connected devices

const { exec } = require('child_process');
const {getAdapterName} = require('../utils/adapter')

const getConnectedDevices = async (res) => {
    let adapterName = await getAdapterName();
    const devicesCommand = `iw dev ${adapterName} station dump`;

    exec(devicesCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error retrieving connected devices: ${error.message}`);
            return;
        }
        const connectedDevices = parseConnectedDevices(stdout);
        if(connectedDevices.length>0){
            console.log(`Number of connected devices: ${connectedDevices.length}`);
            console.log('Connected devices: ', connectedDevices);
        }
        const jsonData = {
            devices: connectedDevices.map(index => ({ status: 'connected' })),
        };
        // Send the updated connectivity status as a response
        res.json(jsonData);
    });
}

function parseConnectedDevices(output) {
    const lines = output.split('\n');
    const connectedDevices = [];

    lines.forEach((line) => {
        const macAddressMatch = line.match(/Station ([0-9a-fA-F:]{17})/);
        if (macAddressMatch) {
            connectedDevices.push(macAddressMatch[1]);
        }
    });
    return connectedDevices;
}

const handleWifiDevices = (req, res) => {
    getConnectedDevices(res);
}

module.exports = {
    handleWifiDevices
}
const { getNetStatus,getWifiDevices,updateCredentials,toggleHotspot,getLoraDevices,startStream,endStream,startLora } = require("../controllers/controllers")

module.exports = (server) => {
    server.get('/api/getNetStatus',getNetStatus)

    server.get('/api/getWifiDevices',getWifiDevices)

    server.get('/api/getLoraDevices', getLoraDevices)

    server.post('/api/update-credentials', updateCredentials)

    server.post('/api/toggle-hotspot', toggleHotspot)

    server.post('/api/startStream',startStream)

    server.post('/api/endStream',endStream)

    server.post('/api/start-lora',startLora)
}
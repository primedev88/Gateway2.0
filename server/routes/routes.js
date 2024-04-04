const { getNetStatus,getWifiDevices,updateCredentials,toggleHotspot,getLoraDevices,toggleStream } = require("../controllers/controllers")

module.exports = (server) => {
    server.get('/api/getNetStatus',getNetStatus)

    server.get('/api/getWifiDevices',getWifiDevices)

    server.get('/api/getLoraDevices', getLoraDevices)

    server.post('/api/update-credentials', updateCredentials)

    server.post('/api/toggle-hotspot', toggleHotspot)

    server.post('/api/stream',toggleStream)
    
}
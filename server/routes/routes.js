const { getNetStatus,getWifiDevices,updateCredentials,toggleHotspot } = require("../controllers/controllers")

module.exports = (server) => {
    server.get('/api/getNetStatus',getNetStatus)

    server.get('/api/getWifiDevices',getWifiDevices)

    server.post('/api/update-credentials', updateCredentials)

    server.post('/api/toggle-hotspot', toggleHotspot)
    
}
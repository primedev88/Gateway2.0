const { getNetStatus,getWifiDevices } = require("../controllers/controllers")

module.exports = (server) => {
    server.get('/api/getNetStatus',getNetStatus)

    server.get('/api/getWifiDevices',getWifiDevices)
    
}
const { handleCheckNet } = require('../services/netStatus')
const { handleWifiDevices } = require('../services/wifiDevices')


const getNetStatus = (req,res) => {
    return handleCheckNet(req,res);
}

const getWifiDevices = (req,res) => {
    return handleWifiDevices(req,res);
}

module.exports = {
    getNetStatus,
    getWifiDevices
}
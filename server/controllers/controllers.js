const { handleCheckNet } = require('../services/netStatus')
const { handleWifiDevices } = require('../services/wifiDevices')
const { handleSubmit } = require('../services/upCredential')
const { handleToggle } = require('../services/toggle')


const getNetStatus = (req,res) => {
    return handleCheckNet(req,res);
}

const getWifiDevices = (req,res) => {
    return handleWifiDevices(req,res);
}

const updateCredentials = (req,res) => {
    return handleSubmit(req,res);
}

const toggleHotspot = (req,res) => {
    return handleToggle(req,res);
}

module.exports = {
    getNetStatus,
    getWifiDevices,
    updateCredentials,
    toggleHotspot 
}
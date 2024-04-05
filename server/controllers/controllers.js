const { handleCheckNet } = require('../services/netStatus')
const { handleWifiDevices } = require('../services/wifiDevices')
const { handleSubmit } = require('../services/upCredential')
const { handleToggle } = require('../services/toggle')
const { handleLoraDevices } = require('../services/getLora')
const { handleStartStream } =require('../services/startStream')
const { handleEndStream } =require('../services/endStream')


const getNetStatus = (req,res) => {
    return handleCheckNet(req,res);
}

const getWifiDevices = (req,res) => {
    return handleWifiDevices(req,res);
}

const getLoraDevices = (req,res) => {
    return handleLoraDevices(req,res);
}

const updateCredentials = (req,res) => {
    return handleSubmit(req,res);
}

const toggleHotspot = (req,res) => {
    return handleToggle(req,res);
}

const startStream = (req,res) => {
    return handleStartStream(req,res);
}
const endStream = (req,res) => {
    return handleEndStream(req,res);
}
module.exports = {
    getNetStatus,
    getWifiDevices,
    getLoraDevices,
    updateCredentials,
    toggleHotspot,
    startStream,
    endStream
}
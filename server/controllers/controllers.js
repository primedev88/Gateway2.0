const { handleCheckNet } = require('../services/netStatus')


const getNetStatus = (req,res) => {
    return handleCheckNet(req,res);
}

module.exports = {
    getNetStatus
}
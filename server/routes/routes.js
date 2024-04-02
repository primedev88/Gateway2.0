const { getNetStatus } = require("../controllers/controllers")

module.exports = (server) => {
    server.get('/api/getNetStatus',getNetStatus)

    
}
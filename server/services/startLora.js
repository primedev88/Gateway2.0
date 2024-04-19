const { exec } = require('child_process');

const loraCommand = 'cd home/mantiswave/Downloads/pySx/ && sudo python3 mod7.py'
const endLora = 'pkill -f mod7.py';

const handleStartLora = (req,res)=>{
    const { isLora } = req.body;

    if(isLora){
        exec(loraCommand, (error, stdout, stderr) => {
            if (error) {  
                return;
            }
        });
    }
    else{
        exec(endLora, (error, stdout, stderr) => {
            if (error) {  
                return;
            }
        });
    }
}

module.exports ={
    handleStartLora
}
const autoBind = require("auto-bind")
const jwt = require("jsonwebtoken")
module.exports = class Controller{
    constructor(){
        autoBind(this);
    }
    async jwtGenerator(payload){
        const expiresIn =  new Date().getTime() + (1000 * 60 * 60 * 24 * 30);
        const token = await jwt.sign(payload, "yadaki-iran-tehran", {algorithm : "HS256", expiresIn});
        return token;
    }
    removeFile(Req_File) {
        if (Req_File) {
            let path = `${Req_File.destination}/${Req_File.filename}`
            if (fs.existsSync(path)) {
                fs.unlinkSync(path, (err) => {})
            }
        }

    }
    removeExistFile(address) {
        if (address) {
            const file = "./public" + address;
            if (fs.existsSync(file)) {
                fs.unlinkSync(file, (err) => { })
            }
        }

    }
    getFileName(Req_File) {
        if (Req_File) {
            let filePath = `${Req_File.destination}/${Req_File.filename}`.substring(8);
            return filePath
        }
        return undefined
    }
    codeRandomGenerator(){
        return Math.floor((Math.random() * 90000) + 10000)
    }
}
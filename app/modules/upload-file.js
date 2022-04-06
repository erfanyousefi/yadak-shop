const multer = require("multer")
const moment = require("moment-jalaali")
const fs = require("fs")
const path = require("path")
const createFolderWithDate = (folder) => {
    const year = moment().jYear();
    const month = moment().jMonth();
    const day = moment().jDate();
    return `./public/upload/${folder}/${year}/${month}/${day}/`;
}
const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        const folder = req.originalUrl.indexOf("product") > 0? "product" : req.originalUrl.indexOf("blog") > 0? "blog" : req.originalUrl.indexOf("company") > 0? "logo" : "other"
    const path = createFolderWithDate(folder)
    if(!fs.existsSync(path)){
            fs.mkdirSync(path, {recursive : true})
        }
        callback(null, path)
    },
    filename : (req, file, callback) => {
        const ext = path.extname(file.originalname)
        const filename = String(new Date().getTime()) + ext;
        callback(null, filename)

    }
})
const upload = multer({storage});
module.exports = {
    upload
}
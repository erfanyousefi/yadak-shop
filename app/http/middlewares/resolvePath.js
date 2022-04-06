const {dirname} =  require("path")
const {fileURLToPath} =  require("url")
module.exports = (req, res, next) => {
    // const __dirname = dirname(fileURLToPath(import.meta.url));
    // req.__dirname = __dirname;
    next();
}
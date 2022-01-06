import {dirname} from "path";
import {fileURLToPath} from "url"
export default (req, res, next) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    req.__dirname = __dirname;
    next();
}
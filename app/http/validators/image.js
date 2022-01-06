import path from "path";
import {body} from "express-validator"
const uploadImageValidator = () => {
    return [
        body("image").custom((value, {req}) => {
            if(value && req.file){
                const exts = [".png", ".jpg", ".webp", ".jpeg", ".gif"];
                const ext = path.extname(req.file);
                if(exts.includes(ext)){
                    return true;
                }
                throw "فرمت تصویر را به درستی انتخاب کنید"
            }else{
                throw "یک تصویر را انتخاب کنید"
            }
        })
    ]
}

export {
    uploadImageValidator
}
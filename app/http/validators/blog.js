const { body } = require("express-validator")
const path = require("path")
const insertBlog = () => [
    body("title").notEmpty().withMessage("عنوان مقاله نمیتواند خالی باشد"),
    body("text").notEmpty().withMessage("توضیحات مقاله نمیتواند خالی باشد"),
    body("suggest").notEmpty().withMessage("پیشنهادات مقاله نمیتواند خالی باشد"),
    body("images").custom((value, {req}) => {
        if(req.files?.images?.length){
            const exts = [".png", ".jpg", "jpeg", ".gif", ".webp"]
            for (const file of req.files.images) {
                const ext = path.extname(file.originalname);
                if(!exts.includes(ext)) throw "لطفا در انتخاب فرمت تصاویر دقت کنید"
            }
            return true
        }
        throw "حداقل یک تصویر را انتخاب کنید"
    }),
    body("pdf").custom((value, {req}) => {
        if(req.files?.pdf?.length){
            const exts = [".pdf"]
            for (const file of req.files.pdf) {
                const ext = path.extname(file.originalname);
                if(!exts.includes(ext)) throw "فایل انتخاب شده pdf نمیباشد"
            }
            return true
        }
        throw "یک فایل را انتخاب کنید"
    })
    
]

module.exports = {insertBlog};
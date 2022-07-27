const {body, query, param} = require("express-validator")
const mongoose  = require("mongoose");
const {isValidObjectId} = mongoose
function insertProductValidator () {
    return [
        body("name").notEmpty().withMessage("نام محصول نمیتواند خالی"),
        body("text").notEmpty().withMessage("توضیحات محصول نمیتواند خالی باشد"),
        body("count").notEmpty().withMessage("تعداد محصول در انبار را مشخص کنید"),
        body("serialnumber").notEmpty().withMessage("شماره سریال محصول را وارد کنید"),
        body("price").notEmpty().withMessage("قیمت محصول را وارد کنید"),
        body("image").custom((value, {req}) => {
            if(!req.file) throw "لطفا یک تصویر را انتخاب نمایید"
            return true;
        })
    ]
}

function insertPriceValidator () {
    return [
        body("price").notEmpty().withMessage("قیمت را وارد کنید"),
        body("company").notEmpty().custom(value => {
            if(value && isValidObjectId(value)){
                return true
            }else{
                throw "یک برند را انتخاب کنید"
            }
        })
    ]
}
module.exports = {
    insertPriceValidator,
    insertProductValidator
}
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
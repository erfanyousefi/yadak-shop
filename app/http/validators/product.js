import {body, query, param} from "express-validator";
import mongoose  from "mongoose";
const {isValidObjectId} = mongoose
export function insertProductValidator () {
    return [
        body("title").notEmpty().withMessage("نام محصول نمیتواند خالی"),
        body("text").notEmpty().withMessage("توضیحات محصول نمیتواند خالی باشد"),
        body("count").notEmpty().withMessage("تعداد محصول در انبار را مشخص کنید"),
        body("serialnumber").notEmpty().withMessage("شماره سریال محصول را وارد کنید")
    ]
}

export function insertPriceValidator () {
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
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
import {body, query, param} from "express-validator";
export function insertCompanyValidator () {
    return [
        body("fa_name").notEmpty().withMessage("نام فارسی نمیتواند خالی"),
        body("en_name").notEmpty().withMessage(" نام لاتین نمیتواند خالی باشد"),
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



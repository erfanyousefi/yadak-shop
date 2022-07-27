const {body, query, param} = require("express-validator");
function insertCompanyValidator () {
    return [
        body("fa_name").notEmpty().withMessage("نام فارسی نمیتواند خالی"),
        body("en_name").notEmpty().withMessage(" نام لاتین نمیتواند خالی باشد"),
    ]
}
module.exports = {
    insertCompanyValidator
}
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),
// body("").notEmpty().withMessage(""),



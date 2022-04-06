const CompanyModel = require("../../../../models/company")
const Controller = require("../../controller")
const ComapnyService = require("./company.service")
let message, messages = {}
module.exports = new class CompanyController extends Controller{
    async comanyList(req, res, next){
        try {
            const companies = await ComapnyService.findCompanies();
            res.status(200).render("pages/admin/company/companies", {
                companies
            })
        } catch (error) {
            next(error)
        }
    }
    async addCompanyForm(req, res, next){
        try {
            return res.status(200).render("pages/admin/company/add-company")
        } catch (error) {
            next(error)
        }
    }
    async insertCompany(req, res, next){
        try {
            const {fa_name, en_name} = req.body;
            await ComapnyService.insert({fa_name, en_name});
            return res.status(201).json({
                status : 201,
                success : true,
                message : "افزودن شرکت تولید کننده با موفقیت انجام شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async uploadLogoCompanyForm(req, res, next){
        try{
            const {id} = req.params
            return res.status(200).render("./pages/admin/company/upload-logo", {
                company_id : id,
                message,
                messages
            })
        }catch(error){
            next(error)
        }
    }
    async uploadLogoCompany(req, res, next){
        try{
            const image = this.getFileName(req.file);
            const {id} = req.params;
            await CompanyModel.updateOne({_id : id} , {$set : {logo : image}}).catch(error => {
                this.removeFile(req.file)
            })
            return res.status(201).redirect("/admin/company")
        }catch(error){
            next(error)
        }
    }
    
}
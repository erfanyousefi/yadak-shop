import CompanyModel from "../../../../models/company.js";
import Controller from "../../controller.js";
import ComapnyService from "./company.service.js"
export default new class CompanyController extends Controller{
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
    
}
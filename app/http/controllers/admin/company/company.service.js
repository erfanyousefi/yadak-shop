import Controller from "../../controller.js";
import CompanyModel from "../../../../models/company.js";
export default new class CompanyService extends Controller{
    async findCompanies(filter = {}){
        return (await CompanyModel.find(filter))
    }
    async findCompany(id){
        const company = await CompanyModel.findById(id);
        if(company) return company;
        throw {status : 404, message : "شرکت مورد نظر یافت نشد"}
    }
    async insert(payload = {}){
        return (await CompanyModel.create(payload))
    }
}
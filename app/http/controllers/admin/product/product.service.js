const ProductModel = require("../../../../models/product")
const Controller = require("../../controller")

module.exports = new class ProductService extends Controller{
    async insertProduct(doc){
        const product = await ProductModel.create(doc).then(product => product);
        if(product) return product;
        throw {status : 400, message : "ثبت محصول انجام نشد"}
    }
    async updateProduct(id, payload){
        await this.findOneProduct(id);
        await ProductModel.updateOne({_id : id}, {$set : {...payload, sizes : {...payload.sizes}}})
    }
    async removeProduct(id){
        await this.findOneProduct(id)
        await ProductModel.deleteOne({_id : id});
    }
    async findProducts(filters){
        const products = await ProductModel.find(filters);
        return products;
    }
    async findOneProduct(id){
        const product = await ProductModel.findById(id);
        if(product) return product;
        throw {status : 400, message : "محصولی یافت نشد"}
    }
    async uploadImageProduct(id, images){

    }
}
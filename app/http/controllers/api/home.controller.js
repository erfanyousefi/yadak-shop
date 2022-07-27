const UserModel = require("../../../models/user")
const productModel = require("../../../models/product")
const Controller = require("./../controller")
module.exports = new class HomeController extends Controller {
    async addToCard(req, res, next) {
        try{
            const user = req.user;
            const {
                product,
            } = req.body;
            const productRecord = await productModel.findOne({
                _id: product
            })
            if (!productRecord) throw {
                status: 400,
                message: "محصولی یافت نشد"
            }
            const userProduct = await UserModel.findOne({
                username: user.username,
                "basket.product": product
            });
            let basket = {}
            if (userProduct) {
                for (const basket of userProduct.basket) {
                    if (basket.product == product) {
                        basket.count += 1;
                    }
                }
                await UserModel.updateOne({
                    _id: user._id
                }, {
                    $set: {
                        basket: userProduct.basket
                    }
                })
            } else {
                basket = {
                    product,
                    count: 1,
                }
                await UserModel.updateOne({
                    _id: user._id
                }, {
                    $push: {
                        basket
                    }
                })
            }
            return res.json({
                status: 201,
                success: true,
                message: "محصول با موفقیت به سبد خرید افزوده شد"
            })
        }catch(error){
            next(error)
        }
    }
    async removeFromCard(req, res, next) {
        try {
            const user = req.user;
            const {
                product,
            } = req.body;
            const productRecord = await productModel.findOne({
                _id: product
            })
            if (!productRecord) throw {
                status: 400,
                message: "محصولی یافت نشد"
            }
            const userProduct = await UserModel.findOne({
                username: user.username,
                "basket.product": product
            });
            let basket = {}
            if (userProduct) {
                for (const basket of userProduct.basket) {
                    if (basket.product == product) {
                        if (+basket.count > 1) {
                            basket.count -= 1;
                            await UserModel.updateOne({
                                _id: user._id
                            }, {
                                $set: {
                                    basket: userProduct.basket
                                }
                            })
                        } else {
                            await UserModel.updateOne({
                                _id: user._id
                            }, {
                                $pull: {
                                    basket: {
                                        product
                                    }
                                }
                            })
                        }
                    }
                }
            } else {
                throw {
                    status: 400,
                    message: " محصولی یافت نشد"
                }
            }
            return res.json({
                status: 201,
                success: true,
                message: "محصول با موفقیت از سبد خرید حذف شد"
            })
        } catch (error) {
            next(error)
        }
    }
    async getBasket(req, res, next) {
        try {
            const user = req.user;
            const basket = user?.basket || []
            
        } catch (error) {
            next(error)
        }
    }
}
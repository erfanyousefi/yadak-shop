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
            // const basket = user?.basket || []
            const basket = await UserModel.aggregate([
                {$match: {_id: user._id}},
                {$lookup: {
                    from: "products",
                    localField: "basket.product",
                    foreignField: "_id",
                    as: "product"
                }},
                {
                    $project: {
                        "otp": 0,
                        "token": 0,
                        "product.count": 0,
                        "product.saleCount": 0,
                        "product.text": 0,
                        "product.createdAt": 0,
                        "product.updatedAt": 0,
                        "createdAt": 0,
                        "updatedAt": 0,
                    }
                },
                {
                    $addFields: {
                        "productDetail" : {
                            $function: {
                                body: function(productDetail, basket){
                                    return productDetail.map(function(product){
                                        const count = basket.find(item => item.product.valueOf() == product._id.valueOf()).count;
                                        const totalPrice = +count * +product.price
                                        const fixDiscount = +product.off || 0
                                        return {
                                            _id: product._id,
                                            title: product.name,
                                            brand: product.brand,
                                            productType: product.productType,
                                            useFor: product.useFor,
                                            type: product.type,
                                            price: product.price,
                                            discount: product.off,
                                            basketCount: count,
                                            totalPrice,
                                            finalPrice: totalPrice - ((fixDiscount / 100) * totalPrice)
                                        }
                                    })
                                },
                                args: ["$product", "$basket"],
                                lang: "js"
                            }
                        },
                    }
                },
                {
                    $project: {
                        "basket": 0,
                        "product": 0
                    }
                },
                {
                    $addFields: {
                        "payDetail" : {
                            $function: {
                                body: function(productDetail){
                                    const productAmount =  productDetail.reduce(function(total, product){
                                        return total + (product.finalPrice)
                                    }, 0)
                                    const productIds = productDetail.map(product => product._id.valueOf())
                                    return {
                                        productAmount,
                                        paymentAmount : productAmount,
                                        productIds
                                    }
                                },
                                args: ["$productDetail"],
                                lang: "js"
                            }
                        },
                    }
                },
            ])
            return res.status(200).json({
                statusCode: 200,
                data: {
                    basket
                }
            })
        } catch (error) {
            next(error)
        }
    }
}
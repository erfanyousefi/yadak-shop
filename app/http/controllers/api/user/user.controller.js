const BlogModel = require("../../../../models/blog")
const Controller = require("../../controller")
module.exports = new class UserController extends Controller{
    async blogs(req, res, next) {
        try {
            const blogs = await BlogModel.find({});
            return res.status(200).json({
                status : 200,
                success : true,
                blogs
            })
        } catch (error) {
            next(error)
        }
    }
    async findBlogWithID(req, res, next) {
        try {
            const {id} = req.params;
            const blog = await BlogModel.findOne({_id : id});
            if(!blog) throw {status : 404, message : "مقاله ای یافت نشد"}
            return res.status(200).json({
                status : 200,
                success : true,
                blog
            })
        } catch (error) {
            next(error)
        }
    }
}
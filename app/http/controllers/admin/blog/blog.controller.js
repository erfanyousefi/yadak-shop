const blogModel = require("../../../../models/blog")
const Controller = require("./../../controller")
let message = null, messages = {}
class BlogController extends Controller{
    async insertBlog(req, res, next){
        try {
            const {title, text, suggest} = req.body;
            messages = Object.keys(req?.body?.errors || {}).length? req.body.errors : {};
            let images, pdf;
            const fileField = req?.files || undefined
            if(fileField?.images?.length) images = fileField.images.map(file => file.destination.substr(8) + file.filename)
            if(fileField?.pdf?.length) pdf = fileField.pdf.map(file => file.destination.substr(8) + file.filename)[0]
            const blog = await blogModel.create({ title, text, suggest, images, pdf  })
            .catch(error => {
                messages = {...messages, ...error}
                this.removeFile(req.files.images)
                this.removeFile(req.files.pdf)
            })
            if(blog) message = "ثبت مقاله با موفقیت انجام شد"
            return res.status(200).json({
                statusCode: 200,
                message
            })
        } catch (error) {
            next(error);
        }
    }
    async updateBlog(req, res, next){
        try {
            const data = {
                title : req.body?.title,
                text : req.body?.text,
                suggest : req.body?.suggest
            };
            const {id} = req.params;
            const fileField = req?.files || undefined
            if(fileField?.images?.length) data.images = fileField.images.map(file => file.destination.substr(8) + file.filename) || undefined;
            if(fileField?.pdf?.length) data.pdf = fileField.pdf.map(file => file.destination.substr(8) + file.filename)[0] || undefined
            Object.keys(data => {if([undefined, null, ""," ", "  ", {}, []].includes(data[key])) delete data[key]});
            const blog = await blogModel.updateOne({_id : id}, data).catch(error => {
                messages = {...messages, ...error}
                this.removeFile(req.files.images)
                this.removeFile(req.files.pdf)
            })
            if(blog) message = "به روزرسانی  مقاله با موفقیت انجام شد"
            res.redirect("/admin/blog/edit-form/"+id)

        } catch (error) {
            next(error);
        }
    }
    async blogs(req, res, next){
        try{
            const blogs = await blogModel.find({}).sort({_id : -1});
            return res.status(200).json({
                statusCode: 200,
                data: {
                    blogs
                }
            })
        }catch(error){
            next(error);
        }
    }
}

module.exports =  new BlogController();
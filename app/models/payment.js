import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    verify : {type : Boolean , required : true},
    user : {type : mongoose.Types.ObjectId , required : true},
    invoiceNumber : {type : String , required : true},
    authority : {type : String , required : true},
    amount : {type : Number , required : true , min : 0},
    refId : {type : String , default : ''},
    cartHash : {type : String , default : ''},
    description : {type : String},
    type : {type : String , required : true}
} , {
    versionKey : false,
    timestamps : true
})

const paymentModel = mongoose.model('payment' , paymentSchema)

export default paymentModel
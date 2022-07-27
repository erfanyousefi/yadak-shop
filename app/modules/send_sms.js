const kavenegar = require("kavenegar") 
const smsClient = kavenegar.KavenegarApi({apikey : "7A356A38474F636B434C4B5078466C387546467138796356324A366A796F7A6334504F762F3879346F32303D"})
function send_smd(mobile, message){
    smsClient.Send({
        message, 
        receptor : mobile,
        date : new Date().getTime()

    }, (error) => {
        console.log(error)
    })
}
module.exports = {
    send_smd
}
const axios = require('axios')
const sendSms = async (mobile , code) => {
    const {status , data} = await axios.post('https://api.sms.ir/v1/send/verify' , {
        "mobile": mobile,
        "templateId": 777254,
        parameters : [
          {
            name : 'Code',
            value : `${code}`
          }
        ]
      } , {
        headers : {
            ACCEPT : 'application/json',
            'X-API-KEY' : process.env.SMS_SECRETE_KEY
        }
    })
    console.log({status , data});
    if(status !== 200) throw {statusCode : status , message : data.message}  
}

module.exports = {
    sendSms
}
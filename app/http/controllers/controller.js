import autoBind from "auto-bind";
import jwt from "jsonwebtoken"
export default class Controller{
    constructor(){
        autoBind(this);
    }
    async jwtGenerator(payload){
        const expiresIn =  new Date().getTime() + (1000 * 60 * 60 * 24 * 30);
        const token = await jwt.sign(payload, "yadaki-iran-tehran", {algorithm : "HS256", expiresIn});
        return token;
    }
}
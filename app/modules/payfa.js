/**
 * Payfa.com Node.js Module
 * @module Payfa.com
 * @author Payfa <Payfa.com>
 * @copyright Payfa.com 2020
 * @version 1.0.0
 * @license Apache-2.0
 */

/** Payfa.com Class */
class Payfa
{
    /**
     * Get the API Key
     * @param {string} api Your gateway API Key.
     * @throws Will throw an error if the API isn't string.
     */
    constructor(api){
        if(api != '' && typeof api === 'string'){
            this.request = require('request');
            this.api = api;
            this.sendEndPoint = 'https://payment.payfa.com/v1/api/payment/request';
            this.verifyEndPoint = 'https://payment.payfa.com/v1/api/payment/verify';
            this.gateway = 'https://payment.payfa.com/v1/api/payment/gateway/';
        }
        else
            throw new Error('You should pass your Payfa.com API Key to the constructor.');
    }

    /**
     * Build and prepare transaction URL
     * @param {number} amount Transaction's Amount
     * @param {string} callbackURL User will redirect to this URL to check transaction status
     * @param {string} [null] invoice_id Order ID or Invoice Number
     * @throws Will throw an error if URL building isn't successfull.
     */
    send(amount, callbackURL, invoice_id){
        const $this = this;
        invoice_id = invoice_id || null;
        return new Promise((resolve, reject) => {
            if(typeof amount !== 'number' || amount < 1000)
                throw new Error('Transaction\'s amount must be a number and equal/greater than 1000');
            else if(typeof callbackURL !== 'string' || callbackURL.length < 5)
                throw new Error('Callback (redirect) URL must be a string.');
            else if(callbackURL.slice(0,4) != 'http')
                throw new Error('Callback URL must start with http/https');
            this.request.post({
                url: this.sendEndPoint,
                form: {api: $this.api, amount, redirect: callbackURL, invoice_id}
            }, (error, response, body) => {
                console.log(response)
                console.log(body)
                if(error)
                    reject(error.code);
                else if(response.statusCode != 200)
                    reject(new Error('Request status code was not OK.'));
                else if(typeof body != 'undefined' && JSON.parse(body).status > 1)
                    reject(JSON.parse(body).errorMessage);
                resolve(this.gateway + JSON.parse(body).transId);
            });
        });
    }

    /**
     * 
     * @param {Object} req Your webframework POST body/payload
     */
    verify(requestBody){
        const $this = this;
        let transId = parseInt(requestBody.transId);
        return new Promise((resolve, reject) => {
            if(!transId || typeof transId !== 'number')
                throw new Error('Transaction ID is not valid.');
            
            this.request.post({
               url: this.verifyEndPoint,
               form: {api: this.api, transId}
            }, (error, response, body) => {
                if(error)
                    reject(error.code);
                else if(response.statusCode != 200)
                    reject(new Error('Request status code was not OK.'));
                else if(typeof body != 'undefined' && JSON.parse(body).status == 0)
                    reject(JSON.parse(body).errorMessage);
                resolve({
                    amount: JSON.parse(body).amount,
                    cardno: requestBody.cardno,
                    transactionId: transid,
                    invoice_id: requestBody.invoice_id
                });
            });
        });
    }
}

module.exports = Payfa;
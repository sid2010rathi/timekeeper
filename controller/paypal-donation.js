const cors = require('cors');
const express = require('express');
const paypal = require('paypal-rest-sdk');



const donation = async function(req, res){
    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': 'AXw_1kt0VL5ITmj8V1nhIct_0I7y82wP0l9ec5Bgm1sQ3hWkmNlcY3DS41AhV-3xHcgR_lDTSkGlQUjb',
        'client_secret': 'EJ_IxrwT7DUkAKYfn6AJWhACcI2htkA--DQ70QQlCXG4u4g2dhlMHQrOYvj64eNYCwG4-4yNXf_5c5pc'
      });
      const amount = req.body.amount;
          const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/success",
                "cancel_url": "http://localhost:3000/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Donation from Timekeeper",
                        "price": amount.toString(),
                        "quantity": 1,
                        "currency": "CAD"
                    }]
                },
                "amount": {
                    "currency": "CAD",
                    "total": amount.toString()
                },
                "description": "Hat for the best team ever"
            }]
        };
        
          paypal.payment.create(create_payment_json, function (error, payment) {
              if (error) {
                  throw error;
              } else {
                  for(let i = 0;i < payment.links.length;i++){
                  if(payment.links[i].rel === 'approval_url'){
                      res.redirect(payment.links[i].href);
                  }
                  }
              }
          });
      
};


const donationSuccess = async function(req, res){
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
      
        const execute_payment_json = {
          "payer_id": payerId,
          "transactions": [{
              "amount": {
                  "currency": "USD",
                  "total": "25.00"
              }
          }]
        };
      
        paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
          if (error) {
              console.log(error.response);
              throw error;
          } else {
              console.log(JSON.stringify(payment));
              res.send('Success');
          }
      });
    
}; 

const donationfails = async function(req, res){
    res.send('Cancelled');
}

module.exports ={donation, donationSuccess, donationfails}



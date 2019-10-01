var express = require('express');
var router = express.Router();
var speakeasy = require('speakeasy');
var QRCode = require('qrcode');
/* GET home page. */
var base32secret;
router.get('/', function(req, res, next) {
  var secret = speakeasy.generateSecret({length: 20});
  base32secret = secret.base32;
  QRCode.toDataURL(secret.otpauth_url,{width: 200}, function(err, data_url) {
    console.log(data_url);
    return res.render("index",{img_url: data_url});
  });
});

router.post('/',function(req,res,next){
  // Use verify() to check the token against the secret
  console.log(base32secret);
  console.log(req.body.token);
  var verified = speakeasy.totp.verify({ 
    secret: base32secret,
    encoding: 'base32',
    token: req.body.token });
  console.log(verified);
})
module.exports = router;

const JWT_SECRET = "hdksfkdfkndfdfnk%$%$#%$hjmlkfsdYY&T&%^$^$RGJknlkdmfls879387294kn";
const MAIL_SENDER = 'finalprojectmean@gmail.com';
const randomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
}
module.exports = {
    JWT_SECRET,
    MAIL_SENDER,
    randomNumber
}
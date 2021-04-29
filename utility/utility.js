const JWT_SECRET = "hdksfkdfkndfdfnk%$%$#%$hjmlkfsdYY&T&%^$^$RGJknlkdmfls879387294kn";
const MAIL_SENDER = 'finalprojectmean@gmail.com';
const randomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

const calculateHours = (endTime, startTime) => {
    let inTime = new Date(startTime);
    let outTime = new Date(endTime);
    let diff = outTime.getTime() - inTime.getTime()
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);
    return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
}

module.exports = {
    JWT_SECRET,
    MAIL_SENDER,
    randomNumber,
    calculateHours
}
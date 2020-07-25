const nodemailer = require('nodemailer');
const config = require('config');

module.exports = async (to, content) => {
    try {
        const email = {
            user: config.get('email.login'),
            pass: config.get('email.pass')
        }

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: email 
        });
        
        await transporter.sendMail({
            from: '"Портал Психологического Тестирования" <psychologicaltestingportal@gmail.com>',
            to: to,
            subject: content.subject || "Новое сообщение",
            text: content.text || "Новое сообщение",
            html: content.html || ""
        });
        return 1;
    } catch(e) {
        console.log('Error sending email: ', e.message);
        return 0;
    }
    
}
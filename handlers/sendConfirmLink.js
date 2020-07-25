const sendEmail = require('./sendEmail');

module.exports = async (to, link) => {
    const subject = "Подтверждение регистрации"
    const text = "Пожалуйста, подтвердите ваш адрес электронной почты";
    const html = `<p>Чтобы завершить регистрацию, перейдите пожалуйста по ссылке</p>
    <a href="${link}">Ссылка!</a>
    <h4>Спасибо за регистрацию!</h4>`;
    try {
        const result = await sendEmail(to, {subject, text, html});
        return result;
    } catch(e) {
        console.log('Catch error, while send confirm link: ', e.message);
        return 0;
    }    
}
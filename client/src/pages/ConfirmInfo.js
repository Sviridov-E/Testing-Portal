import React from 'react';
import '../styles/confirm.scss';

const ConfirmInfo = () => {
    return (
        <article className="confirm container">
            <div className="row confirm-info">
                <div className="card-panel indigo accent-2 col s12 m8 l6 offset-m2 offset-l3 white-text">
                    <h3 className="header">Почти готово!</h3>
                    <p className="info">Для продолжения работы вам необходимо подтвердить вашу учетную запись. На указанный при регистрации адрес электронной почты отправлено письмо с инструкцией.</p>
                </div>
            </div>
        </article>
    )
}

export default ConfirmInfo;
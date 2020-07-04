import React from 'react';
import '../styles/modalError.scss'

export const ModalError = ({ error, buttonClick}) => {
    return (
        <div className="error-container">
            <div className="modal">
                <div className="modal-content">
                    <h4>Ошибка!</h4>
                    <hr/>
                    <p>{error || 'Непредвиденная ошибка. Попробуйте позже.'}</p>
                </div>
                <div className="modal-footer">
                    <button onClick={buttonClick} className="modal-close waves-effect waves-red btn-flat">Закрыть</button>
                </div>
            </div>
        </div>
    );

}
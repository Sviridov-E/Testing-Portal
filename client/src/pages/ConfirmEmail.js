import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import '../styles/confirm.scss';
import { useHttp } from '../hooks/http.hook';
import { useCallback } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Loader } from '../components/Loader';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const ConfirmEmail = () => {
    const [success, setSuccess] = useState(false);
    const hash = useRouteMatch('/confirm/:hash').params.hash;

    const { request, loading, error, /* clearError */ } = useHttp();

    const { activate, userId } = useContext(AuthContext);

    const toConfirm = useCallback(async () => {
        try {
            const result = await request(`/api/confirm/${hash}`, 'GET');
            setSuccess(result.success);
        } catch(e) {}
    }, [hash, request])

    useEffect(() => {
        toConfirm();
    }, [toConfirm])
    useEffect(() => {
        if(success) {
            userId && activate();
        }
    }, [success, activate, userId]);
    if(error) {    
        return (
            <div>
                <h3>Error</h3>
                <p>{error.message}</p>
            </div>
        );
    }
    
    if(!success || loading) {
        return <Loader size="big"/>
    }

    return (
        <article className="container confirm">
            <div className="confirm-email row">
                <div className="card-panel indigo accent-2 col s12 m8 l6 offset-m2 offset-l3 white-text">
                    <h3 className="header">Готово!</h3>
                    <p className="info">Спасибо за регистрацию, ваш аккаунт подтвержден! Теперь вам доступен весь функционал портала.</p>
                    <div className="btn-wrapper">
                        <button className="waves-effect btn indigo go-btn">
                            <Link to="/tests">Начать!</Link>   
                        </button> 
                    </div>
                </div>
            </div>
        </article>
    )
}
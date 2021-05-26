import React from 'react';
import {useHttp} from '../../hooks/http.hook';
import {useAuth} from '../../hooks/auth.hook';

import "./authorization.scss";

export const LoginForm = () => {
    const { loading, request, error } = useHttp();
    const {login} = useAuth();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        request('/admin/', 'POST', json)
            .then(data => {
                if (!data.token) {
                    throw new Error();
                }
                login(data.token);
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div className="authorization">
            <h2 className="title title__auth">Авторизация администратора</h2>
            <form className="authorization__form"
                onSubmit={(e) => handleFormSubmit(e)}>
                <label htmlFor="login">Логін</label>
                <input className={error ? "authorization__error" : null} type="text" id="login" name="login"/>
                <label htmlFor="pass">Пароль</label>
                <input className={error ? "authorization__error" : null} type="password" name="password"/>
                <span className={error ? "authorization__error-msg authorization__error-msg_visible" : "authorization__error-msg"} >Невірний логін або пароль</span>
                <button disabled={loading} className="button button__form">Увійти</button> 
            </form>
        </div>
    )
}
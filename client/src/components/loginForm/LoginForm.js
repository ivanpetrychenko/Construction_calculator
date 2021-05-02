import React from 'react';

import "./authorization.scss";

export const LoginForm = () => {
    return (
        <div className="authorization">
            <h2 className="title title__auth">Авторизация администратора</h2>
            <form action="#" className="authorization__form">
                <label htmlFor="login">Логін</label>
                <input className="authorization__error" type="text" id="login"/>
                <label htmlFor="pass">Пароль</label>
                <input type="password"/>
                <span className="authorization__error-msg">Невірний логін або пароль</span>
                <button className="button button__form">Увійти</button> 
            </form>
        </div>
    )
}
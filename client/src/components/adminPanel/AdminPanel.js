import React, {useEffect} from 'react';
import {useHttp} from '../../hooks/http.hook';
import {useAuth} from '../../hooks/auth.hook';
import { useSelector, useDispatch } from 'react-redux';
import {servicesItemsRequested} from '../../actions';
import {Link} from 'react-router-dom';

import "./admin.scss";

export const AdminPanel = () => {
    const { loading, request, error, clearError } = useHttp();
    const {services, login} = useSelector(state => state);
    const dispatch = useDispatch();
    const {logout} = useAuth();

    useEffect(() => {
        if (!services || services.length === 0) {
            request('/operations/')
                .then(data => dispatch(servicesItemsRequested(data)));
        }
    }, []);

    if (!login) {
        return (
            <div className="admin-panel__error">
                <span>Поверніться на сторінку авторизації</span>
                <Link className="button button__exit" to="/">Назад</Link>
            </div>
        )
    }

    return (
        <div className="admin-panel">
            <h2 className="title title__panel">
                Встановіть середній цінник кожної роботи:
            </h2>
            <ul className="admin-panel__grid">
                {services.map(item => {
                    return (
                        <li key={item.id} className="admin-panel__item">
                            <div className="admin-panel__item-title">{item.name}</div>
                            <input 
                                id={item.id} 
                                type="number" 
                                className="admin-panel__item-input" 
                                placeholder="20" 
                                defaultValue={item.count}
                                onChange={(event) => {
                                    request(`/operations/${item.id}`, 'PUT', JSON.stringify({count: event.target.value}))
                                        .then(res => console.log(res))
                                    }}/>
                            <span className="admin-panel__item-unit">{item.unit}</span>
                        </li>
                    )
                })}
            </ul>
            <div className="admin-panel__notes">
                <div>
                    <div className="calculator__notes-title">Примітки: </div>
                    <ul>
                        <li className="calculator__note">встановлюйте тільки цифри, одиниці вимірювання підставляються автоматично</li>
                    </ul>
                </div>
                
            </div>
            <div className="admin-panel__btns">
                <Link className="button button__exit" to="/">Назад</Link>
                <Link className="button button__exit" to="/" onClick={logout}>Вийти</Link>
            </div>
        </div>
    )
}
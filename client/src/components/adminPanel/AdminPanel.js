import React, {useEffect} from 'react';
import {useServiceContext} from '../../context/ServiceAppContext';
import { useSelector, useDispatch } from 'react-redux';
import {servicesItemsRequested} from '../../actions';
import {Link} from 'react-router-dom';

import "./admin.scss";

export const AdminPanel = () => {
    const {getServicesInputs, updateResource} = useServiceContext();
    const services = useSelector(state => state.services);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!services || services.length === 0) {
            console.log('empty')
            getServicesInputs()
                .then(data => dispatch(servicesItemsRequested(data)));
        }
    }, [])

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
                                    updateResource(item.id, JSON.stringify({count: event.target.value}))
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
                <Link className="button button__exit" to="/">Вийти</Link>
            </div>
        </div>
    )
}
import React, {useEffect} from 'react';
import {useServiceContext} from '../../context/ServiceAppContext';
import { useSelector, useDispatch } from 'react-redux';
import {servicesItemsRequested, servicesItemsChanged} from '../../actions';

export default function CalculatorServicesOptions({hidden}) {
    const {getServicesInputs} = useServiceContext();
    const services = useSelector(state => state.services);
    const dispatch = useDispatch();

    useEffect(() => {
        getServicesInputs()
            .then(data => dispatch(servicesItemsRequested(data)));
    }, [dispatch, getServicesInputs])

    const handleValueChange = (id, value) => {
        dispatch(servicesItemsChanged(id, value));
    }
    console.log(services);
    return (
        <div className="calculator__options" hidden = {hidden}>
            <h2 className="title title__panel">Назва необхідних робіт:</h2>
            <ul className="calculator__service-grid">
                {services.map(item => {
                    return (
                        <li key={item.id} className="service-item">
                            <div className="service-item__descr">
                                <div className="service-item__title">{item.name}</div>
                                <div className="service-item__price">
                                    <span>{item.count}</span>
                                    {item.unit}
                                </div>
                            </div>
                            <label htmlFor={item.id} className="service-item__choice">
                                <input onChange={event => handleValueChange(item.id, event.target.checked)} id={item.id} type="checkbox"/>
                                <span className="service-item__checkbox"></span>
                            </label>
                        </li>
                    )
                })}
            </ul>
            <div className="calculator__notes">
                <div className="calculator__notes-title">Примечания: </div>
                <ul>
                    <li className="calculator__note">встановлюйте галочку навпроти послуги, якщо вона необхідна</li>
                    <li className="calculator__note">поруч з послугою відображена середня вартість на поточний момент. Сюди входить робота та
                        матеріал. Це може бути вартість за квадратний або погонний метр, усереднена вартість
                        всій сантехніки для ремонту і тд. Підсумковий варіант може відрізнятися від обраних вами
                        матеріалів, але калькулятор дасть вам розуміння про вартість ремонту середньої якості.
                    </li>
                </ul>
            </div>
        </div>
    )
}
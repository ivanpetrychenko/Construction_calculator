import React, {useEffect} from 'react';
import {useServiceContext} from '../../context/ServiceAppContext';
import { useSelector, useDispatch } from 'react-redux';
import {squareItemsRequested, squareItemsChanged, clearChanges, heightChanged} from '../../actions';
import {calculateHeight} from '../../logic/calculateHeight';
import {calculateSquareItems} from '../../logic/calculateSquareItems';

export default function CalculatorSquareOptions({hidden}) {
    const {getSquareInputs} = useServiceContext();
    const {squares, services, height, totalSquare, totalPriceHRN, usdRate} = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        getSquareInputs()
            .then(data => dispatch(squareItemsRequested(data)));

            return dispatch(clearChanges())
    }, [dispatch, getSquareInputs]);

    const validateInput = (value, elem) => {
        if (value < 0) elem.style.color = 'red';
        if (value >= 0) elem.style.color = '';
    }

    const handleHeightChange = (value, elem) => {
        validateInput(value, elem);
        const {newHeight, newTotalPriceHRN, newTotalPriceUSD} = calculateHeight(services, value, height, totalSquare, totalPriceHRN, usdRate);
        dispatch(heightChanged(newHeight, newTotalPriceHRN, newTotalPriceUSD));
    }

    const handleSquareChange = (id, value, elem) => {
        validateInput(value, elem);
        const {newSquares, newTotalSquare, newTotalPriceHRN, newTotalPriceUSD} = calculateSquareItems(id, value, squares, services, height, usdRate);
        dispatch(squareItemsChanged(newSquares, newTotalSquare, newTotalPriceHRN, newTotalPriceUSD));
    }

    return (
        <div className="calculator__options" hidden = {hidden}> 
            <div className="area-item area-item_first">
                <div className="area-item__title">Висота стелі в квартирі:</div>
                <input 
                    onChange={event => handleHeightChange(+event.target.value, event.target)} 
                    type="number" 
                    id="height" 
                    placeholder="0" 
                    min="0"/>
                <span className="area-item__unit">м</span>
            </div>
            <h2 className="title title__panel">Площа окремих кімнат:</h2>
            <ul className="calculator__area-grid">

                {squares.map(item => {
                    return (
                        <li key={item.id} className="area-item">
                            <div className="area-item__title">{item.name}</div>
                            <input 
                                onChange={event => handleSquareChange(item.id, +event.target.value, event.target)}
                                // eslint-disable-next-line
                                onFocus={event => {if (event.target.value == 0) event.target.value = ''}}
                                type="number" 
                                id={item.id} 
                                placeholder="0" 
                                min="0"/>
                            <span className="area-item__unit">м<sup>2</sup></span>
                        </li>
                    )
                })}
            </ul>

            <div className="calculator__notes">
                <div className="calculator__notes-title">Примечания: </div>
                <ul>
                    <li className="calculator__note">встановлюйте площу приміщень там, де є потреба у ремонті</li>
                    <li className="calculator__note">якщо є додаткові кімнати, наприклад, Спальня №3, то додайте їх площю до
                        існуючих в калькуляторі</li>
                    <li className="calculator__note">заповнюйте висоту стелі. Деякі розрахунки обов'язково потребують цього параметра</li>
                </ul>
            </div>
        </div> 
    )
}
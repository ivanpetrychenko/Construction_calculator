import React, {useEffect} from 'react';
import {useServiceContext} from '../../context/ServiceAppContext';
import { useSelector, useDispatch } from 'react-redux';
import {squareItemsRequested, squareItemsChanged, clearChanges, heightChanged} from '../../actions';

export default function CalculatorSquareOptions({hidden}) {
    const {getSquareInputs} = useServiceContext();
    const squares = useSelector(state => state.squares);
    const totalSquare = useSelector(state => state.totalSquare);
    const totalPriceHRN = useSelector(state => state.totalPriceHRN);
    const dispatch = useDispatch();

    useEffect(() => {
        getSquareInputs()
            .then(data => dispatch(squareItemsRequested(data)));

            return dispatch(clearChanges())
    }, [dispatch, getSquareInputs]);

    const handleValueChange = (value, id, hook) => {
        dispatch(hook(value, id));
    }

    console.log(squares);
    console.log(totalPriceHRN);
    return (
        <div className="calculator__options" hidden = {hidden}> 
            <div className="area-item area-item_first">
                <div className="area-item__title">Висота стелі в квартирі:</div>
                <input 
                    onChange={event => handleValueChange(+event.target.value, 'height', heightChanged)} 
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
                                onChange={event => handleValueChange(+event.target.value, item.id, squareItemsChanged)}
                                // eslint-disable-next-line
                                onFocus={event => {if (event.target.value == 0) event.target.value = ''}}
                                value={item.value} 
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
                </ul>
            </div>
        </div> 
    )
}
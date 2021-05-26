import React, {useEffect} from 'react';
import {useHttp} from '../../hooks/http.hook';
import {usdCurrencyRequested} from '../../actions';
import { useSelector, useDispatch } from 'react-redux';

export default function CalculatorTotal() {
    const {totalPriceHRN, totalPriceUSD} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request, error} = useHttp();

    useEffect(() => {
        request('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json', 'GET', null, {})
            .then(data => {
                const usd = data.find(item => item.cc === "USD");
                return usd.rate
            })
            .then(data => {
                dispatch(usdCurrencyRequested(data));
            })
            .catch(e => {
                console.log(e);
                dispatch(usdCurrencyRequested(1))
            })
    }, [dispatch, request])

    return (
        <div className="calculator__total">
            <div className="calculator__total-price">
                <span id="total_hrn">{totalPriceHRN.toFixed()}</span> грн
            </div>
            <div className="calculator__total-descr">
                Орієнтовна<br/>
                загальна вартість робіт
            </div>
            <div className="calculator__total-price">
                <span className={error ? "error" : null} id="total_usd">{error ? "Помилка" : totalPriceUSD.toFixed(2)}</span> $
            </div>
            <div className="calculator__total-descr">
                Сума в доларах США<br/>
                за поточним курсом
            </div>
        </div>
    )
}
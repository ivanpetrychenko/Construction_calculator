import React from 'react';
import { useSelector } from 'react-redux';

export default function CalculatorTotal() {
    const totalPriceHRN = useSelector(state => state.totalPriceHRN);
    const totalPriceUSD = useSelector(state => state.totalPriceUSD);

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
                <span id="total_usd">{totalPriceUSD.toFixed(2)}</span> $
            </div>
            <div className="calculator__total-descr">
                Сума в доларах США<br/>
                за поточним курсом
            </div>
        </div>
    )
}
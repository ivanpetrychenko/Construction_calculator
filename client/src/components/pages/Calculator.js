import React from 'react';
import {Link} from 'react-router-dom';
import CalculatorField from '../calculator/Calculator-field';
import CalculatorTotal from '../calculator/Calculator-total';
import {useHttp} from '../../hooks/http.hook';
import { useSelector } from 'react-redux';

import "./calculator.scss";

export const Calculator = () => {
    const { loading, request, error, clearError } = useHttp();
    const {squares, services, height, totalPriceHRN, totalPriceUSD} = useSelector(state => state);
    
    const handlePdfCreation = (squares, services, height, totalPriceHRN, totalPriceUSD) => {
        const data = {
            squares, 
            services, 
            height, 
            totalPriceHRN: totalPriceHRN.toFixed(0), 
            totalPriceUSD: totalPriceUSD.toFixed(2)
        }
        request('/createpdf/', 
                'POST', 
                JSON.stringify(data),
                {'Content-Type': 'application/json'},
                true)
            .then(msg => console.log(msg))
            .catch(e => console.log(e));
    }

    return (
        <>
            <div className="calculator">
                <CalculatorField/>
                <CalculatorTotal/>
            </div>
            <Link className="button button__log" to="/login">Ввійти як адміністратор</Link>
            <button className="button button__pdf" 
                    onClick={() => handlePdfCreation(squares, services, height, totalPriceHRN, totalPriceUSD)}
            >Зберегти як PDF</button>
        </>
    )
}
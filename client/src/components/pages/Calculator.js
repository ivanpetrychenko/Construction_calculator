import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import CalculatorField from '../calculator/Calculator-field';
import CalculatorTotal from '../calculator/Calculator-total';
import {useHttp} from '../../hooks/http.hook';
import { useSelector } from 'react-redux';

import "./calculator.scss";

export const Calculator = () => {
    const { loading, request, error, clearError, download } = useHttp();
    const {squares, services, height, totalPriceHRN, totalPriceUSD} = useSelector(state => state);
    
    useEffect(() => {
        request('/downloadpdf/all')
            .then(data => console.log(data))
    }, [])

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
            .then(msg => {
                console.log(msg)
                if (!msg.message) throw new Error('Недостатньо даних');

                return download('/downloadpdf/',
                    'POST', 
                    JSON.stringify({url: msg.message}))
            })
            .then((response) => {
                const url = window.URL.createObjectURL(response);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', "Розрахунок");
                document.body.appendChild(link);
                link.click();
            })
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
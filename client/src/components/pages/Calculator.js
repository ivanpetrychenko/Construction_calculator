import React from 'react';
import {Link} from 'react-router-dom';
import CalculatorField from '../calculator/Calculator-field';
import CalculatorTotal from '../calculator/Calculator-total';
import PdfList from '../pdfList/PdfList';
import {useHttp} from '../../hooks/http.hook';
import { useSelector } from 'react-redux';

import "./calculator.scss";

export const Calculator = () => {
    const { loading, request, error, download, clearError } = useHttp();
    const {squares, services, height, totalPriceHRN, totalPriceUSD, login} = useSelector(state => state);

    const handlePdfCreation = (squares, services, height, totalPriceHRN, totalPriceUSD) => {
        const data = {
            squares, 
            services, 
            height, 
            totalPriceHRN: totalPriceHRN.toFixed(0), 
            totalPriceUSD: totalPriceUSD.toFixed(2)
        }
        clearError();
        request('/createpdf/', 
                'POST', 
                JSON.stringify(data),
                {'Content-Type': 'application/json'},
                true)
            .then(msg => {
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
                    disabled={loading}
                    style={error ? {backgroundColor: "red"} : null}
            >Зберегти як PDF</button>
            {error ? <div className="title title__panel error mt50">Недостатньо даних або помилка створення PDF</div> : null}
            {login ? <PdfList/> : null}
        </>
    )
}
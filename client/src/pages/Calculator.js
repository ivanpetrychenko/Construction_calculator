import React from 'react';
import {Link} from 'react-router-dom';
import CalculatorField from '../components/calculator/Calculator-field';
import CalculatorTotal from '../components/calculator/Calculator-total';

import "./calculator.scss";

export const Calculator = () => {
    return (
        <>
            <div className="calculator">
                <CalculatorField/>
                <CalculatorTotal/>
            </div>
            <Link className="button button__log" to="/login">Ввійти як адміністратор</Link>
        </>
    )
}
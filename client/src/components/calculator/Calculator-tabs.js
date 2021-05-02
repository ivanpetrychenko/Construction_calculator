import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {changeTabs} from '../../actions';

export default function CalculatorTabs() {
    const tab = useSelector(state => state.tab);
    const dispatch = useDispatch();

    const chooseClass = (value, activeClass) => {
        if (tab === value) {
            return `calculator__tab ${activeClass}`
        } else { 
            return "calculator__tab"
        }
    }

    return (
        <nav className="calculator__tabs">
            <ul>
                <li 
                onClick={() => dispatch(changeTabs('squares'))} 
                className={chooseClass('squares', "calculator__tab_active")}>
                    <span>Площа приміщення</span>
                </li>
                <li 
                onClick={() => dispatch(changeTabs('services'))} 
                className={chooseClass('services', "calculator__tab_active")}>
                    <span>Необхідні роботи</span>
                </li>
            </ul>
        </nav>
    )
}
import React from 'react';
import { useSelector } from 'react-redux';

import CalculatorTabs from './Calculator-tabs';
import CalculatorSquareOptions from './Calculator-square-options';
import CalculatorServicesOptions from './Calculator-services-options';

export default function CalculatorField() {
    const tab = useSelector(state => state.tab);

    const isHidden = (value) => {
        if (tab === value) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className="calculator__field">
            <CalculatorTabs/>

            <CalculatorSquareOptions hidden={isHidden("services")}/>
            <CalculatorServicesOptions hidden={isHidden("squares")}/>
        </div>
    )
}
import React from 'react';
import img from './Spinner.svg';

export default function Spinner() {
    return (
        <img className="spinner" src={img} alt="Loading"></img>
    )
}
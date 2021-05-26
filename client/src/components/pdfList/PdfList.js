import React, {useEffect, useState} from 'react';
import {useHttp} from '../../hooks/http.hook';
import pdflogo from '../../resource/img/pdf_icon.svg';
import Spinner from '../Spinner/Spinner';


export default function PdfList ()  {
    const { loading, request, error, download } = useHttp();
    const [list, changeList] = useState([]);

    useEffect(() => {
        request('/downloadpdf/all')
            .then(data => changeList(data.result))
            .catch(e => console.log(e))
    }, [request]);

    const handlePdfLoading = (e, url) => {
        e.preventDefault();
        download('/downloadpdf/',
            'POST', 
            JSON.stringify({url}))
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
        <div className="calculator__pdfcontainer">
            <h2 className="title title__panel">Збереженi розрахунки:</h2>
            <ul className="calculator__pdflist">
                {loading ? <Spinner/> : null}
                {error ? <span className="title title__panel error">Помилка завантаження, спробуйте ще раз</span> : null}
                {
                    list.map(item => {
                        return (
                            <li key={item.name} className="calculator__pdflist-item">
                                <button onClick={(e) => handlePdfLoading(e, item.url)}>
                                    <img src={pdflogo} alt="pdf file"></img>
                                    <span>{item.name}</span>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}
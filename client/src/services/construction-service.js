const _apiBase = 'http://localhost:3001';
const _currencyApi = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

export const getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}` + 
            `, received ${res.status}`);
    }
    return await res.json();
}

export const getSquareInputs = async () => {
    return await getResource(`${_apiBase}/squares/`);
}

export const getServicesInputs = async () => {
    return await getResource(`${_apiBase}/operations/`);
}

export const getCurrency = async () => {
    return await getResource(_currencyApi);
}
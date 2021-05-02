export const changeTabs = (tabName) => {
    return {
        type: 'TABS_CHANGED',
        tabName
    }
}

export const squareItemsRequested = (items) => {
    return {
        type: 'SQUARE_ITEMS_REQUESTED',
        items
    }
}

export const servicesItemsRequested = (items) => {
    return {
        type: 'SERVICES_ITEMS_REQUESTED',
        items
    }
}

export const heightChanged = (height,totalPriceHRN, totalPriceUSD) => {
    return {
        type: 'HEIGHT_CHANGED',
        height, 
        totalPriceHRN, 
        totalPriceUSD
    }
}

export const servicesItemsChanged = (services, totalPriceHRN, totalPriceUSD) => {
    return {
        type: 'SERVICES_ITEMS_CHANGED',
        services,
        totalPriceHRN, 
        totalPriceUSD
    }
}


export const squareItemsChanged = (squares, totalSquare, totalPriceHRN, totalPriceUSD) => {
    return {
        type: 'SQUARE_ITEMS_CHANGED',
        squares, 
        totalSquare, 
        totalPriceHRN, 
        totalPriceUSD
    }
}

export const usdCurrencyRequested = (rate) => {
    return {
        type: 'USD_CURRENCY_REQUESTED',
        rate
    }
}

export const clearChanges = () => {
    return {
        type: 'CHANGES_CLEARED'
    }
}


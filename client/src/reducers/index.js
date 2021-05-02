const initialState = {
    login: true,
    tab: "squares",
    error: false,
    loading: false,
    squares: [],
    services: [],
    totalSquare: 0,
    height: 0,
    totalPriceHRN: 0,
    totalPriceUSD: 0,
    usdRate: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TABS_CHANGED': 
            return {
                ...state,
                tab: action.tabName
            }
        case 'SQUARE_ITEMS_REQUESTED': 
            return {
                ...state,
                squares: action.items
            }
        case 'HEIGHT_CHANGED': 
            return {
                ...state,
                height: action.height,
                totalPriceHRN: action.totalPriceHRN,
                totalPriceUSD: action.totalPriceUSD
            }
        case 'SQUARE_ITEMS_CHANGED': 
            return {
                ...state, 
                squares: action.squares,
                totalSquare: action.totalSquare,
                totalPriceHRN: action.totalPriceHRN,
                totalPriceUSD: action.totalPriceUSD
            };
        case 'SERVICES_ITEMS_REQUESTED': 
            return {
                ...state,
                services: action.items
            }
        case 'CHANGES_CLEARED': 
            return {
                ...state,
                totalSquare: 0,
                height: 0,
                totalPriceHRN: 0,
                totalPriceUSD: 0
            }
        case "SERVICES_ITEMS_CHANGED":
            return {
                ...state,
                services: action.services,
                totalPriceHRN: action.totalPriceHRN,
                totalPriceUSD: action.totalPriceUSD
            }
        case 'USD_CURRENCY_REQUESTED':
            return {
                ...state,
                usdRate: action.rate
            }
        default: return state
    }
}

export default reducer;
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

export const heightChanged = (value) => {
    return {
        type: 'HEIGHT_CHANGED',
        value
    }
}

export const servicesItemsChanged = (id, value) => {
    let type;

    switch (id) {
        case "destruction":
        case "ceiling":
        case "ceiling_painting":
        case "ceiling_putty":
        case "floor":
        case "laminate":
            type = "STRAIGHT_PRICE_CALCULATED";
            break;
        case "wall_plaster":
        case "wall_putty":
        case "wallpaper":
        case "wall_painting":
            type = "WALL_SQUARE_PRICE_CALCULATED";
            break;
        case "floor_border":
        case "ceiling_border":
            type = "BORDER_PRICE_CALCULATED";
            break;
        case "windows":
            type = "WINDOWS_PRICE_CALCULATED";
            break;
        case "doors_in":
            type = "DOORS_IN_PRICE_CALCULATED";
            break;
        case "tile":
            type = "TILE_PRICE_CALCULATED";
            break;
        case "doors_out":
        case "plumbing":
        case "electrition":
            type = "FIX_PRICE_CALCULATED";
            break;
        default:
            type = ""
    }

    return {
        type: type,
        id, value
    }
}


export const squareItemsChanged = (value, id) => {
    return {
        type: 'SQUARE_ITEMS_CHANGED',
        id, value
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


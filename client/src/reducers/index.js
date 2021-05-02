const initialState = {
    login: false,
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

const _numberOfSquaresPerWindow = 7.5,
      _numberOfSquaresPerDoor = 25;

// Функции вычисления стоимости

const calculateStraightPrice = (square, count) => {
    return square * count;
}

const calculateWallSquarePrice = (square, count, height) => {
    let result = (2 * Math.sqrt(square) * 2 * height) * count;
    return result;
}

const calculateBorderPrice = (square, count) => {
    return 4 * Math.sqrt(square) * count;
}

const calculateWindowOrDoorPrice = (square, count, settings) => {
    let numbers = square / settings;
    if (numbers < 0.5) numbers = 0;
    if (numbers >= 0.5 && numbers < 1) numbers = 1;
    return numbers * count;
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

            state.services.forEach(item => {
                if (item.checked) {
                    switch (item.id) {
                        case "wall_plaster":
                        case "wall_putty":
                        case "wallpaper":
                        case "wall_painting":
                            state.totalPriceHRN -= calculateWallSquarePrice(state.totalSquare, item.count, state.height);
                            state.totalPriceHRN += calculateWallSquarePrice(state.totalSquare, item.count, action.value);
                            break;
                        default:
                            state.totalPriceHRN += 0;
                    }
                }
            });
            return {
                ...state,
                height: action.value,
                totalPriceHRN: state.totalPriceHRN,
                totalPriceUSD: state.totalPriceHRN / state.usdRate
            }
        case 'SQUARE_ITEMS_CHANGED': 
            if (action.value < 0) action.value = 0; 

            let sqSum = 0;
            state.squares.forEach(item => {
                sqSum = sqSum + item.value
            });

            const itemInd = state.squares.findIndex(item => item.id === action.id);
            const itemInState = state.squares.find(item => item.id === action.id);
            const newItem = {
                ...itemInState,
                value: action.value
            }

            const square = sqSum + action.value - itemInState.value;

            let recalculatedPrice = 0;
            state.services.forEach(item => {
                if (item.checked) {

                    switch (item.id) {
                        case "destruction":
                        case "ceiling":
                        case "ceiling_painting":
                        case "ceiling_putty":
                        case "floor":
                        case "laminate":
                            recalculatedPrice += calculateStraightPrice(square, item.count);
                            break;
                        case "wall_plaster":
                        case "wall_putty":
                        case "wallpaper":
                        case "wall_painting":
                            recalculatedPrice += calculateWallSquarePrice(square, item.count, state.height);
                            break;
                        case "floor_border":
                        case "ceiling_border":
                            recalculatedPrice += calculateBorderPrice(square, item.count);
                            break;
                        case "windows":
                            recalculatedPrice += calculateWindowOrDoorPrice(square, item.count, _numberOfSquaresPerWindow);
                            break;
                        case "doors_in":
                            recalculatedPrice += calculateWindowOrDoorPrice(square, item.count, _numberOfSquaresPerDoor);
                            break;
                        case "tile":
                            let interBathroomSquare = 0, interToiletSquare = 0;
                            if (action.id === "bathroom") {
                                interBathroomSquare = action.value;
                            } else {
                                interBathroomSquare = state.squares.find(item => item.id === "bathroom").value;
                            }

                            if (action.id === "toilet") {
                                interToiletSquare = action.value;
                            } else {
                                interToiletSquare = state.squares.find(item => item.id === "toilet").value;
                            }

                            const intTileTotal = interBathroomSquare + interToiletSquare;

                            recalculatedPrice += calculateStraightPrice(intTileTotal, item.count);
                            break;
                        case "doors_out":
                        case "plumbing":
                        case "electrition":
                            recalculatedPrice += +item.count;
                            break;
                        default:
                            recalculatedPrice += 0;
                    }
                }
            });

            return {
                ...state, 
                squares: [
                    ...state.squares.slice(0, itemInd),
                    newItem,
                    ...state.squares.slice(itemInd + 1)
                ],
                totalSquare: square,
                totalPriceHRN: recalculatedPrice,
                totalPriceUSD: recalculatedPrice / state.usdRate
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
        case "STRAIGHT_PRICE_CALCULATED":
            const a = state.services.findIndex(item => item.id === action.id);
            const countA = state.services[a]["count"];

            const aInState = state.services.find(item => item.id === action.id);
            const newAItem = {
                ...aInState,
                checked: action.value
            }

            if (action.value) {
                state.totalPriceHRN = state.totalPriceHRN + calculateStraightPrice(state.totalSquare, countA);
            } else {
                state.totalPriceHRN = state.totalPriceHRN - calculateStraightPrice(state.totalSquare, countA);
            }

            return {
                ...state,
                services: [
                    ...state.services.slice(0, a),
                    newAItem,
                    ...state.services.slice(a + 1)
                ],
                totalPriceHRN: state.totalPriceHRN,
                totalPriceUSD: state.totalPriceHRN / state.usdRate
            }
        case "WALL_SQUARE_PRICE_CALCULATED":
            const b = state.services.findIndex(item => item.id === action.id);
            const countB = state.services[b]["count"];

            const bInState = state.services.find(item => item.id === action.id);
            const newBItem = {
                ...bInState,
                checked: action.value
            }

            // Мутации не происходит, так как идет дальше замена объекта
            if (action.value) {
                state.totalPriceHRN = state.totalPriceHRN + calculateWallSquarePrice(state.totalSquare, countB, state.height);
            } else {
                state.totalPriceHRN = state.totalPriceHRN - calculateWallSquarePrice(state.totalSquare, countB, state.height);
            }
            return {
                ...state,
                services: [
                    ...state.services.slice(0, b),
                    newBItem,
                    ...state.services.slice(b + 1)
                ],
                totalPriceHRN: state.totalPriceHRN,
                totalPriceUSD: state.totalPriceHRN / state.usdRate
            }
        case "BORDER_PRICE_CALCULATED":
            const c = state.services.findIndex(item => item.id === action.id);
            const countC = state.services[c]["count"];

            const cInState = state.services.find(item => item.id === action.id);
            const newCItem = {
                ...cInState,
                checked: action.value
            }

            // Мутации не происходит, так как идет дальше замена объекта
            if (action.value) {
                state.totalPriceHRN = state.totalPriceHRN + calculateBorderPrice(state.totalSquare, countC);
            } else {
                state.totalPriceHRN = state.totalPriceHRN - calculateBorderPrice(state.totalSquare, countC);
            }
            return {
                ...state,
                services: [
                    ...state.services.slice(0, c),
                    newCItem,
                    ...state.services.slice(c + 1)
                ],
                totalPriceHRN: state.totalPriceHRN,
                totalPriceUSD: state.totalPriceHRN / state.usdRate
            }
        case "WINDOWS_PRICE_CALCULATED":
            const d = state.services.findIndex(item => item.id === action.id);
            const countD = state.services[d]["count"];

            const dInState = state.services.find(item => item.id === action.id);
            const newDItem = {
                ...dInState,
                checked: action.value
            }

            // Мутации не происходит, так как идет дальше замена объекта
            if (action.value) {
                state.totalPriceHRN = state.totalPriceHRN + calculateWindowOrDoorPrice(state.totalSquare, countD, _numberOfSquaresPerWindow);
            } else {
                state.totalPriceHRN = state.totalPriceHRN - calculateWindowOrDoorPrice(state.totalSquare, countD, _numberOfSquaresPerWindow);
            }
            return {
                ...state,
                services: [
                    ...state.services.slice(0, d),
                    newDItem,
                    ...state.services.slice(d + 1)
                ],
                totalPriceHRN: state.totalPriceHRN,
                totalPriceUSD: state.totalPriceHRN / state.usdRate
            }
        case "DOORS_IN_PRICE_CALCULATED":
            const e = state.services.findIndex(item => item.id === action.id);
            const countE = state.services[e]["count"];

            const eInState = state.services.find(item => item.id === action.id);
            const newEItem = {
                ...eInState,
                checked: action.value
            }

            // Мутации не происходит, так как идет дальше замена объекта
            if (action.value) {
                state.totalPriceHRN = state.totalPriceHRN + calculateWindowOrDoorPrice(state.totalSquare, countE, _numberOfSquaresPerDoor);
            } else {
                state.totalPriceHRN = state.totalPriceHRN - calculateWindowOrDoorPrice(state.totalSquare, countE, _numberOfSquaresPerDoor);
            }
            return {
                ...state,
                services: [
                    ...state.services.slice(0, e),
                    newEItem,
                    ...state.services.slice(e + 1)
                ],
                totalPriceHRN: state.totalPriceHRN,
                totalPriceUSD: state.totalPriceHRN / state.usdRate
            }
        case "FIX_PRICE_CALCULATED":
            const f = state.services.findIndex(item => item.id === action.id);
            const countF = state.services[f]["count"];

            const fInState = state.services.find(item => item.id === action.id);
            const newFItem = {
                ...fInState,
                checked: action.value
            }

            // Мутации не происходит, так как идет дальше замена объекта
            if (action.value) {
                state.totalPriceHRN = state.totalPriceHRN + +countF;
            } else {
                state.totalPriceHRN = state.totalPriceHRN - +countF;
            }
            return {
                ...state,
                services: [
                    ...state.services.slice(0, f),
                    newFItem,
                    ...state.services.slice(f + 1)
                ],
                totalPriceHRN: state.totalPriceHRN,
                totalPriceUSD: state.totalPriceHRN / state.usdRate
            }
        case "TILE_PRICE_CALCULATED":
            const bathroomSquare = state.squares.find(item => item.id === "bathroom").value,
                  toiletSquare = state.squares.find(item => item.id === "toilet").value,
                  tileTotal = bathroomSquare + toiletSquare;

            const j = state.services.findIndex(item => item.id === action.id);
            const countJ = state.services[j]["count"];

            const jInState = state.services.find(item => item.id === action.id);
            const newJItem = {
                ...jInState,
                checked: action.value
            }

            // Мутации не происходит, так как идет дальше замена объекта
            if (action.value) {
                state.totalPriceHRN = state.totalPriceHRN + calculateStraightPrice(tileTotal, countJ);
            } else {
                state.totalPriceHRN = state.totalPriceHRN - calculateStraightPrice(tileTotal, countJ);
            }
            return {
                ...state,
                services: [
                    ...state.services.slice(0, j),
                    newJItem,
                    ...state.services.slice(j + 1)
                ],
                totalPriceHRN: state.totalPriceHRN,
                totalPriceUSD: state.totalPriceHRN / state.usdRate
            }
        case 'USD_CURRENCY_REQUESTED':
            console.log(action.rate) 
            return {
                ...state,
                usdRate: action.rate
            }
        default: return state
    }
}

export default reducer;
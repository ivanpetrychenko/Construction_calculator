import {calculateStraightPrice, calculateWallSquarePrice, calculateBorderPrice, calculateWindowOrDoorPrice} from './formulas';
import {_numberOfSquaresPerWindow, _numberOfSquaresPerDoor} from './calcVariables';

export const calculateSquareItems = (id, value, squares, services, height, usdRate) => {
    if (value < 0) value = 0; 

    let sqSum = 0;
    squares.forEach(item => {
        sqSum = sqSum + item.value
    });

    const itemInd = squares.findIndex(item => item.id === id);
    const itemInState = squares.find(item => item.id === id);
    const newItem = {
        ...itemInState,
        value
    }

    const square = sqSum + value - itemInState.value;

    let recalculatedPrice = 0;
    services.forEach(item => {
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
                    recalculatedPrice += calculateWallSquarePrice(square, item.count, height);
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
                    if (id === "bathroom") {
                        interBathroomSquare = value;
                    } else {
                        interBathroomSquare = squares.find(item => item.id === "bathroom").value;
                    }

                    if (id === "toilet") {
                        interToiletSquare = value;
                    } else {
                        interToiletSquare = squares.find(item => item.id === "toilet").value;
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
        newSquares: [
            ...squares.slice(0, itemInd),
            newItem,
            ...squares.slice(itemInd + 1)
        ],
        newTotalSquare: square,
        newTotalPriceHRN: recalculatedPrice,
        newTotalPriceUSD: recalculatedPrice / usdRate
    };
}
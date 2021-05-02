import {calculateStraightPrice, calculateWallSquarePrice, calculateBorderPrice, calculateWindowOrDoorPrice} from './formulas';
import {_numberOfSquaresPerWindow, _numberOfSquaresPerDoor} from './calcVariables';

const calculateDifferentItems = (value, totalPriceHRN, func, totalSquare, count, additional) => {
    if (value) {
        totalPriceHRN = totalPriceHRN + func(totalSquare, count, additional);
    } else {
        totalPriceHRN = totalPriceHRN - func(totalSquare, count, additional);
    }
    return totalPriceHRN;
}

export const calculateServicesChanges = (id, services, squares, value, totalPriceHRN, totalSquare, height, usdRate) => {
    const index = services.findIndex(item => item.id === id);
    const count = services[index]["count"];

    const objInState = services.find(item => item.id === id);
    const newItem = {
        ...objInState,
        checked: value
    }
    switch (id) {
        case "destruction":
        case "ceiling":
        case "ceiling_painting":
        case "ceiling_putty":
        case "floor":
        case "laminate":
            totalPriceHRN = calculateDifferentItems(value, totalPriceHRN, calculateStraightPrice, totalSquare, count);
            break;
        case "wall_plaster":
        case "wall_putty":
        case "wallpaper":
        case "wall_painting":
            totalPriceHRN = calculateDifferentItems(value, totalPriceHRN, calculateWallSquarePrice, totalSquare, count, height);
            break;
        case "floor_border":
        case "ceiling_border":
            totalPriceHRN = calculateDifferentItems(value, totalPriceHRN, calculateBorderPrice, totalSquare, count);
            break;
        case "windows":
            totalPriceHRN = calculateDifferentItems(value, totalPriceHRN, calculateWindowOrDoorPrice, totalSquare, count, _numberOfSquaresPerWindow);
            break;
        case "doors_in":
            totalPriceHRN = calculateDifferentItems(value, totalPriceHRN, calculateWindowOrDoorPrice, totalSquare, count, _numberOfSquaresPerDoor);
            break;
        case "tile":
            const bathroomSquare = squares.find(item => item.id === "bathroom").value,
            toiletSquare = squares.find(item => item.id === "toilet").value,
            tileTotal = bathroomSquare + toiletSquare;

            totalPriceHRN = calculateDifferentItems(value, totalPriceHRN, calculateStraightPrice, tileTotal, count);
            break;
        case "doors_out":
        case "plumbing":
        case "electrition":
            if (value) {
                totalPriceHRN = totalPriceHRN + +count;
            } else {
                totalPriceHRN = totalPriceHRN - +count;
            }
            break;
        default:
            totalPriceHRN += 0;
    }

    return {
        newServices: [
            ...services.slice(0, index),
            newItem,
            ...services.slice(index + 1)
        ],
        newTotalPriceHRN: totalPriceHRN,
        newTotalPriceUSD: totalPriceHRN / usdRate
    }
}
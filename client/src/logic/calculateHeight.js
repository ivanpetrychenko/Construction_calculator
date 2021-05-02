import {calculateWallSquarePrice} from './formulas';

export const calculateHeight = (services, value, height, totalSquare, totalPriceHRN, usdRate) => {
    services.forEach(item => {
        if (item.checked) {
            switch (item.id) {
                case "wall_plaster":
                case "wall_putty":
                case "wallpaper":
                case "wall_painting":
                    totalPriceHRN -= calculateWallSquarePrice(totalSquare, item.count, height);
                    totalPriceHRN += calculateWallSquarePrice(totalSquare, item.count, value);
                    break;
                default:
                    totalPriceHRN += 0;
            }
        }
    });
    return {
        newHeight: value,
        newTotalPriceHRN: totalPriceHRN,
        newTotalPriceUSD: totalPriceHRN / usdRate
    }
}
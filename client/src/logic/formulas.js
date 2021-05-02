export const calculateStraightPrice = (square, count) => {
    return square * count;
}

export const calculateWallSquarePrice = (square, count, height) => {
    let result = (2 * Math.sqrt(square) * 2 * height) * count;
    return result;
}

export const calculateBorderPrice = (square, count) => {
    return 4 * Math.sqrt(square) * count;
}

export const calculateWindowOrDoorPrice = (square, count, settings) => {
    let numbers = square / settings;
    if (numbers < 0.5) numbers = 0;
    if (numbers >= 0.5 && numbers < 1) numbers = 1;
    return numbers * count;
}
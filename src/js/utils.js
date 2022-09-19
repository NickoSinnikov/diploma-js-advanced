export function calcTileType(index, boardSize) {
    //первая колонка
    if (index % boardSize === 0) {
        if (index < boardSize) {
            return "top-left";
        }
        if (index === boardSize * (boardSize - 1)) {
            return "bottom-left";
        }
        return "left";
    }
    //последняя колонка
    if (index % boardSize === 7) {
        if (index < boardSize) {
            return "top-right";
        }
        if (index === boardSize ** 2 - 1) {
            return "bottom-right";
        }
        return "right";
    }
    //верхняя строчка
    if (0 < index && index < boardSize) {
        return "top";
    }
    //нижняя строчка
    if (index > boardSize * (boardSize - 1)) {
        return "bottom";
    }
    //остальные клетки
    return "center";
}

export function calcHealthLevel(health) {
    if (health < 15) {
        return "critical";
    }

    if (health < 50) {
        return "normal";
    }

    return "high";
}
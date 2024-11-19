// export function hexToRgb(hex: string) {
//     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//     return result ? {
//         r: parseInt(result[1], 16),
//         g: parseInt(result[2], 16),
//         b: parseInt(result[3], 16)
//     } : null;
// }

import { Color } from "../App"

export function hexToRGB(hex: string) {

    const hexR = hex.substring(1, 3)
    const r = parseInt(hexR, 16)


    const hexG = hex.substring(3, 5)
    const g = parseInt(hexG, 16)


    const hexB = hex.substring(5, 7)
    const b = parseInt(hexB, 16)


    return [r, g, b]
}

export function selectedColor(color: Color | undefined) {
    if (color != undefined) {
        return color
    }
    const newColor: Color = {
        name: 'Defualt Color',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        topShadow: 'var(--topShadow)',
        bottomShadow: 'var(--bottomShadow)',
        id: 0
    }
    return newColor
}
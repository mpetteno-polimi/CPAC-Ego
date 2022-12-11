export function getScreenRangesForThreeJSWorld(width: number, height: number): ScreenRange {
    const widthStart: number = 0 - width / 2
    const widthEnd: number = widthStart + width

    const heightStart: number = 0 - height / 2
    const heightEnd: number = heightStart + height

    return {
        height: { from: heightStart, to: heightEnd },
        width: { from: widthStart, to: widthEnd },
    }
}

export function getScreenRangesForWebcam(width: number, height: number): ScreenRange {
    const widthStart: number = 0
    const widthEnd: number = widthStart + width

    const heightStart: number = 0
    const heightEnd: number = heightStart + height

    return {
        height: { from: heightStart, to: heightEnd },
        width: { from: widthStart, to: widthEnd },
    }
}

export function convertToRange(value, oldRange: Range, newRange: Range) {
    let newValue = (value - oldRange.from) * (newRange.to - newRange.from) / (oldRange.to - oldRange.from) + newRange.from;
    return Math.min(Math.max(newValue, newRange.from) , newRange.to);
}